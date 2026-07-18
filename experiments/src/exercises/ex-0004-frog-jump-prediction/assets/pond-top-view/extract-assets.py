from pathlib import Path
from PIL import Image, ImageDraw
import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'source-sheet.png'
OUT = ROOT
source = np.asarray(Image.open(SOURCE).convert('RGB'))


def select_components(mask: np.ndarray, keep: int = 1) -> np.ndarray:
    count, labels, stats, centers = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    h, w = mask.shape
    candidates = []
    for idx in range(1, count):
        area = int(stats[idx, cv2.CC_STAT_AREA])
        if area < max(10, int(mask.size * 0.0005)):
            continue
        cx, cy = centers[idx]
        distance = ((cx - w/2)**2 + (cy - h/2)**2) ** .5
        score = area / (1 + distance / max(h, w))
        candidates.append((score, idx))
    candidates.sort(reverse=True)
    out = np.zeros_like(mask, dtype=np.uint8)
    for _, idx in candidates[:keep]:
        out[labels == idx] = 1
    return out


def flood_reachable(passable: np.ndarray) -> np.ndarray:
    flood = passable.astype(np.uint8)
    ffmask = np.zeros((flood.shape[0] + 2, flood.shape[1] + 2), np.uint8)
    for x in range(flood.shape[1]):
        if flood[0, x] == 1: cv2.floodFill(flood, ffmask, (x, 0), 2)
        if flood[-1, x] == 1: cv2.floodFill(flood, ffmask, (x, flood.shape[0]-1), 2)
    for y in range(flood.shape[0]):
        if flood[y, 0] == 1: cv2.floodFill(flood, ffmask, (0, y), 2)
        if flood[y, -1] == 1: cv2.floodFill(flood, ffmask, (flood.shape[1]-1, y), 2)
    return flood == 2


def water_object_mask(rgb: np.ndarray, keep: int = 1) -> np.ndarray:
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    hue, sat, value = (hsv[:, :, i] for i in range(3))
    # Pond water is cyan/turquoise. Pale white caustic strokes count as removable water
    # only when connected to the crop boundary; enclosed object highlights are retained.
    passable = (((hue >= 68) & (hue <= 108) & (sat >= 24)) |
                ((sat < 42) & (value > 188)))
    reached = flood_reachable(passable)
    foreground = (~reached).astype(np.uint8)
    foreground = cv2.morphologyEx(foreground, cv2.MORPH_CLOSE, np.ones((3,3),np.uint8))
    return select_components(foreground, keep)


def pad_mask(rgb: np.ndarray) -> np.ndarray:
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    h, s, v = (hsv[:, :, i] for i in range(3))
    green = ((h >= 24) & (h <= 70) & (s >= 45) & (v >= 35)).astype(np.uint8)
    # Keep the central notched pad, excluding nearby petals and edge fragments.
    yy, xx = np.ogrid[:green.shape[0], :green.shape[1]]
    cx, cy = green.shape[1] * .50, green.shape[0] * .47
    radial = (((xx-cx)/(green.shape[1]*.47))**2 + ((yy-cy)/(green.shape[0]*.45))**2 <= 1)
    green &= radial.astype(np.uint8)
    green = cv2.morphologyEx(green, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8))
    green = select_components(green, 1)
    # Fill only enclosed highlight holes; the wedge notch remains connected to the exterior.
    inv = (green == 0).astype(np.uint8)
    reached = flood_reachable(inv == 1)
    green[~reached] = 1
    return green

def flower_mask(rgb: np.ndarray) -> np.ndarray:
    hsv = cv2.cvtColor(rgb, cv2.COLOR_RGB2HSV)
    h, s, v = (hsv[:, :, i] for i in range(3))
    red = (((h <= 14) | (h >= 160)) & (s >= 65) & (v >= 70))
    yellow = ((h >= 14) & (h <= 36) & (s >= 90) & (v >= 110))
    seed = (red | yellow).astype(np.uint8)
    seed = select_components(cv2.morphologyEx(seed, cv2.MORPH_CLOSE, np.ones((3,3),np.uint8)), 1)
    probable = cv2.dilate(seed, np.ones((7,7),np.uint8), iterations=1)
    support = cv2.dilate(seed, np.ones((11,11),np.uint8), iterations=1)
    definite_bg = support == 0
    gc = np.full(seed.shape, cv2.GC_PR_BGD, dtype=np.uint8)
    gc[definite_bg] = cv2.GC_BGD
    gc[probable == 1] = cv2.GC_PR_FGD
    gc[cv2.erode(seed, np.ones((3,3),np.uint8), iterations=1) == 1] = cv2.GC_FGD
    bg_model = np.zeros((1,65), np.float64); fg_model = np.zeros((1,65), np.float64)
    cv2.grabCut(cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR), gc, None, bg_model, fg_model, 7, cv2.GC_INIT_WITH_MASK)
    out = (((gc == cv2.GC_FGD) | (gc == cv2.GC_PR_FGD)) & (support == 1)).astype(np.uint8)
    out = cv2.morphologyEx(out, cv2.MORPH_CLOSE, np.ones((3,3),np.uint8))
    return select_components(out, 1)


def frog_mask(rgb: np.ndarray) -> np.ndarray:
    h, w = rgb.shape[:2]
    gc = np.full((h,w), cv2.GC_BGD, np.uint8)
    rough = np.array([
      (58,18),(92,18),(108,30),(118,47),(114,58),(124,64),(137,49),(149,53),
      (146,68),(132,81),(116,84),(119,92),(135,95),(142,106),(153,114),
      (150,125),(134,121),(124,132),(105,141),(79,135),(54,141),(35,132),
      (27,122),(8,126),(2,117),(20,104),(26,94),(42,88),(42,81),(25,81),
      (13,70),(7,64),(11,53),(24,50),(34,64),(45,58),(43,44),(48,33)
    ], np.int32)
    cv2.fillPoly(gc, [rough], cv2.GC_PR_FGD)
    # High-confidence generated frog regions; GrabCut expands through the inked silhouette.
    cv2.ellipse(gc, (77,55), (27,31), 0, 0, 360, cv2.GC_FGD, -1)
    cv2.ellipse(gc, (77,91), (27,43), 0, 0, 360, cv2.GC_FGD, -1)
    cv2.line(gc, (54,72), (25,58), cv2.GC_FGD, 8)
    cv2.line(gc, (100,72), (133,58), cv2.GC_FGD, 8)
    cv2.line(gc, (57,107), (28,124), cv2.GC_FGD, 10)
    cv2.line(gc, (98,107), (130,124), cv2.GC_FGD, 10)
    bg_model=np.zeros((1,65),np.float64); fg_model=np.zeros((1,65),np.float64)
    cv2.grabCut(cv2.cvtColor(rgb,cv2.COLOR_RGB2BGR), gc, None, bg_model, fg_model, 9, cv2.GC_INIT_WITH_MASK)
    out=((gc==cv2.GC_FGD)|(gc==cv2.GC_PR_FGD)).astype(np.uint8)
    out=cv2.morphologyEx(out,cv2.MORPH_CLOSE,np.ones((3,3),np.uint8))
    return select_components(out,1)


def rgba_from_mask(name: str, rgb: np.ndarray, mask: np.ndarray, max_side: int = 512) -> Image.Image:
    ys,xs=np.where(mask>0)
    if not len(xs): raise RuntimeError(f'empty mask: {name}')
    margin=5
    x0=max(0,xs.min()-margin); x1=min(mask.shape[1],xs.max()+margin+1)
    y0=max(0,ys.min()-margin); y1=min(mask.shape[0],ys.max()+margin+1)
    rgb=rgb[y0:y1,x0:x1].copy(); mask=mask[y0:y1,x0:x1]
    alpha=cv2.GaussianBlur((mask*255).astype(np.uint8),(0,0),.72)
    alpha[mask==1]=255
    # Feather with nearest solid object color to avoid cyan water fringing.
    outside=(mask==0).astype(np.uint8)
    _, labels=cv2.distanceTransformWithLabels(outside,cv2.DIST_L2,5,labelType=cv2.DIST_LABEL_PIXEL)
    zeros=np.argwhere(outside==0)
    edge=(alpha>0)&(mask==0)
    if len(zeros) and np.any(edge):
        idx=np.clip(labels[edge]-1,0,len(zeros)-1)
        coords=zeros[idx]
        rgb[edge]=rgb[coords[:,0],coords[:,1]]
    im=Image.fromarray(np.dstack([rgb,alpha]).astype(np.uint8),'RGBA')
    if max(im.size)>max_side:
        scale=max_side/max(im.size)
        im=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
    im.save(OUT/f'{name}.png',optimize=True)
    return im

boxes={
 'frog-green': ((745,885,900,1030),'frog',1),
 'lily-pad': ((820,1080,935,1205),'pad',1),
 'lily-pad-flowering': ((205,1085,395,1285),'water',1),
 'lotus-coral': ((180,105,325,240),'flower',1),
 'lotus-red': ((865,290,995,420),'flower',1),
 'rock-round': ((635,355,785,505),'water',1),
 'rock-light': ((495,845,650,985),'water',1),
 'rock-cluster': ((690,530,900,720),'water',2),
}
assets={}
for name,(box,kind,keep) in boxes.items():
    x0,y0,x1,y1=box; rgb=source[y0:y1,x0:x1].copy()
    if kind=='frog': mask=frog_mask(rgb)
    elif kind=='flower': mask=flower_mask(rgb)
    elif kind=='pad': mask=pad_mask(rgb)
    else: mask=water_object_mask(rgb,keep)
    assets[name]=rgba_from_mask(name,rgb,mask)

# Preserve the same authored silhouette as the obstacle while changing only its palette.
frog=np.asarray(assets['frog-green']).copy(); hsv=cv2.cvtColor(frog[:,:,:3],cv2.COLOR_RGB2HSV)
mask=(hsv[:,:,0]>=22)&(hsv[:,:,0]<=75)&(hsv[:,:,1]>=45)&(frog[:,:,3]>0)
hsv2=hsv.copy(); hsv2[:,:,0][mask]=np.clip(7+(hsv[:,:,0][mask]-22)*.08,5,14).astype(np.uint8)
hsv2[:,:,1][mask]=np.clip(hsv[:,:,1][mask]*1.08,70,240).astype(np.uint8)
rgb2=cv2.cvtColor(hsv2,cv2.COLOR_HSV2RGB)
orange=Image.fromarray(np.dstack([rgb2,frog[:,:,3]]).astype(np.uint8),'RGBA')
orange.save(OUT/'frog-orange.png',optimize=True); assets['frog-orange']=orange

# Preview on the real celadon board family.
order=['frog-green','frog-orange','lily-pad','lily-pad-flowering','lotus-coral','lotus-red','rock-round','rock-light','rock-cluster']
preview=Image.new('RGB',(900,780),(246,247,228))
for i,name in enumerate(order):
    tile=Image.new('RGBA',(300,260),(143,199,183,255)); im=assets[name]
    scale=min(230/im.width,205/im.height,1); shown=im.resize((round(im.width*scale),round(im.height*scale)),Image.Resampling.LANCZOS)
    tile.alpha_composite(shown,((300-shown.width)//2,15+(205-shown.height)//2))
    d=ImageDraw.Draw(tile); d.text((12,235),name,fill=(23,56,47,255))
    preview.paste(tile.convert('RGB'),((i%3)*300,(i//3)*260))
preview.save('/tmp/ex4-top-view-preview-v2.jpg',quality=94)
print(OUT)
for p in sorted(OUT.glob('*.png')):
 im=Image.open(p)
 alpha_extrema = im.getchannel('A').getextrema() if 'A' in im.getbands() else None
 print(p.name, im.size, p.stat().st_size, alpha_extrema)
