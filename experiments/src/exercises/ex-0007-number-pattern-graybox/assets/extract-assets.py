#!/usr/bin/env python3
"""Extract transparent EX-0007 sprites and modular terrain from generated sheets.

The source sheets use a deliberately uniform chroma background because transparent
image generation was unavailable. This script removes that background, borrows
nearest solid foreground colour for anti-aliased edge pixels, and normalizes the
three animation frames onto stable canvases.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent
SOURCE_DIR = ROOT / "sources"
SPRITE_DIR = ROOT / "sprites"
TERRAIN_DIR = ROOT / "terrain"
CELL_WIDTH = 512
CELL_HEIGHT = 512


def background_colour(image: np.ndarray) -> np.ndarray:
    """Return the median colour of a border known to contain only chroma key."""
    border = np.concatenate(
        (
            image[:32].reshape(-1, 3),
            image[-32:].reshape(-1, 3),
            image[:, :32].reshape(-1, 3),
            image[:, -32:].reshape(-1, 3),
        )
    )
    return np.median(border, axis=0)


def remove_chroma(cell: np.ndarray, chroma: np.ndarray) -> Image.Image:
    """Convert a chroma-key RGB cell into a decontaminated RGBA image."""
    rgb = cell.astype(np.float32)
    distance = np.linalg.norm(rgb - chroma, axis=2)
    alpha = np.clip((distance - 12.0) / 58.0, 0.0, 1.0)

    # Retain only substantial foreground components. This rejects isolated source
    # noise while keeping the generated object and its intentionally detached bits.
    labels, count = ndimage.label(alpha >= 0.55)
    keep = np.zeros(alpha.shape, dtype=bool)
    for label in range(1, count + 1):
        component = labels == label
        if int(component.sum()) >= 64:
            keep |= component
    keep = ndimage.binary_dilation(keep, iterations=4)
    alpha = np.where(keep, alpha, 0.0)

    # Edge RGB is replaced with the nearest opaque foreground pixel. The original
    # alpha remains, eliminating pink fringe without hardening the silhouette.
    solid = alpha >= 0.96
    if not solid.any():
        raise RuntimeError("No solid foreground pixels found while removing chroma")
    _, nearest = ndimage.distance_transform_edt(~solid, return_indices=True)
    edge = (alpha > 0.0) & ~solid
    rgb[edge] = rgb[nearest[0][edge], nearest[1][edge]]

    rgba = np.dstack((np.clip(rgb, 0, 255).astype(np.uint8), np.round(alpha * 255).astype(np.uint8)))
    return Image.fromarray(rgba, "RGBA")


def object_bounds(image: Image.Image, padding: int = 8) -> tuple[int, int, int, int]:
    alpha = np.asarray(image.getchannel("A"))
    ys, xs = np.where(alpha > 24)
    if not len(xs):
        raise RuntimeError("No foreground found")
    return (
        max(0, int(xs.min()) - padding),
        max(0, int(ys.min()) - padding),
        min(image.width, int(xs.max()) + padding + 1),
        min(image.height, int(ys.max()) + padding + 1),
    )


def normalized_frame(image: Image.Image, size: tuple[int, int], *, baseline: int | None = None) -> Image.Image:
    """Center an unscaled object on a stable animation canvas."""
    crop = image.crop(object_bounds(image, padding=4))
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    x = round((size[0] - crop.width) / 2)
    y = round((size[1] - crop.height) / 2) if baseline is None else baseline - crop.height
    canvas.alpha_composite(crop, (x, y))
    return canvas


def save_png(image: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=True, compress_level=9)


def extract_sheet(path: Path) -> list[Image.Image]:
    rgb = np.asarray(Image.open(path).convert("RGB"))
    chroma = background_colour(rgb)
    cells: list[Image.Image] = []
    for row in range(2):
        for column in range(3):
            cell = rgb[
                row * CELL_HEIGHT : (row + 1) * CELL_HEIGHT,
                column * CELL_WIDTH : (column + 1) * CELL_WIDTH,
            ]
            cells.append(remove_chroma(cell, chroma))
    return cells


def main() -> None:
    character_cells = extract_sheet(SOURCE_DIR / "character-sheet.png")
    for index, image in enumerate(character_cells[:3], start=1):
        save_png(normalized_frame(image, (512, 460), baseline=452), SPRITE_DIR / f"runner-{index}.png")
    for index, image in enumerate(character_cells[3:], start=1):
        save_png(normalized_frame(image, (520, 380)), SPRITE_DIR / f"flyer-{index}.png")

    terrain_cells = extract_sheet(SOURCE_DIR / "terrain-sheet.png")
    terrain_names = (
        "ground-meadow.png",
        "ground-stone.png",
        "ground-root.png",
        "start-cap.png",
        "finish-cap.png",
        "gap-accent.png",
    )
    for name, image in zip(terrain_names, terrain_cells, strict=True):
        save_png(image.crop(object_bounds(image, padding=10)), TERRAIN_DIR / name)


if __name__ == "__main__":
    main()
