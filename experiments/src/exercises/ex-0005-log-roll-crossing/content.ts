export type Point = { x: number; y: number };
export type LearningFunction =
  | 'orientation'
  | 'exploration'
  | 'constraint'
  | 'complication'
  | 'integration'
  | 'independence';
export type Representation = 'broad' | 'line';
export type Setting = 'terrace' | 'mist' | 'canopy' | 'summit';

export type Variant = {
  id: string;
  origin: Point;
  unit: Point;
  totalRolls: number;
};

export type Scene = {
  id: string;
  learningFunction: LearningFunction;
  chapter: string;
  title: string;
  prompt: string;
  mode: 'tutorial' | 'prediction';
  representation: Representation;
  setting: Setting;
  support: 'full' | 'reduced' | 'minimal';
  variants: Variant[];
  success: string;
  smokeErrorValue?: number;
};

export const WORLD = {
  width: 180,
  height: 110,
  acceptedPredictionMax: 7,
  safeMargin: 8
} as const;

export const scenes: Scene[] = [
  {
    id: 'orientation',
    learningFunction: 'orientation',
    chapter: 'Orientation',
    title: 'Découvre la distance d’un tour',
    prompt: 'Active le rouleau. Regarde où il arrive après chaque tour complet.',
    mode: 'tutorial',
    representation: 'broad',
    setting: 'terrace',
    support: 'full',
    variants: [{ id: 'orientation-a', origin: { x: 18, y: 74 }, unit: { x: 20, y: 0 }, totalRolls: 4 }],
    success: 'Quatre tours identiques relient exactement le Départ à l’Arrivée.'
  },
  {
    id: 'exploration',
    learningFunction: 'exploration',
    chapter: 'Exploration',
    title: 'Combien de tours encore ?',
    prompt: 'Regarde le premier tour. Il reste à sa place. Depuis ce nouveau repère, prévois les tours identiques qui restent.',
    mode: 'prediction',
    representation: 'broad',
    setting: 'terrace',
    support: 'full',
    variants: [
      { id: 'exploration-a', origin: { x: 18, y: 74 }, unit: { x: 18, y: 0 }, totalRolls: 4 },
      { id: 'exploration-b', origin: { x: 18, y: 74 }, unit: { x: 16, y: 0 }, totalRolls: 5 }
    ],
    success: 'Le premier tour observé et les tours prévus atteignent exactement l’Arrivée.',
    smokeErrorValue: 2
  },
  {
    id: 'constraint',
    learningFunction: 'constraint',
    chapter: 'Contrainte',
    title: 'La passerelle sans traces',
    prompt: 'Seule la ligne entre les deux balises compte. Le premier tour est ton repère pour toute la longueur.',
    mode: 'prediction',
    representation: 'line',
    setting: 'mist',
    support: 'full',
    variants: [
      { id: 'constraint-a', origin: { x: 18, y: 70 }, unit: { x: 13, y: 0 }, totalRolls: 6 },
      { id: 'constraint-b', origin: { x: 18, y: 70 }, unit: { x: 14, y: 0 }, totalRolls: 5 }
    ],
    success: 'La suite des tours rejoint la balise sur une ligne sans subdivisions.'
  },
  {
    id: 'complication',
    learningFunction: 'complication',
    chapter: 'Complication',
    title: 'La rampe des embruns',
    prompt: 'Le passage monte en diagonale. Observe la distance du premier tour le long de la rampe, puis prévois la suite.',
    mode: 'prediction',
    representation: 'line',
    setting: 'mist',
    support: 'reduced',
    variants: [
      { id: 'complication-a', origin: { x: 24, y: 88 }, unit: { x: 16, y: -8 }, totalRolls: 5 },
      { id: 'complication-b', origin: { x: 24, y: 90 }, unit: { x: 14, y: -7 }, totalRolls: 6 }
    ],
    success: 'Les tours identiques suivent toute la rampe jusqu’à l’Arrivée.'
  },
  {
    id: 'integration',
    learningFunction: 'integration',
    chapter: 'Intégration',
    title: 'Le relais inversé',
    prompt: 'Le rouleau part de l’autre rive. Observe son premier tour, puis engage ta prévision.',
    mode: 'prediction',
    representation: 'line',
    setting: 'canopy',
    support: 'minimal',
    variants: [
      { id: 'integration-a', origin: { x: 152, y: 74 }, unit: { x: -15, y: 0 }, totalRolls: 6 },
      { id: 'integration-b', origin: { x: 152, y: 74 }, unit: { x: -17, y: 0 }, totalRolls: 5 }
    ],
    success: 'La nouvelle unité et la direction inversée conduisent exactement à la balise.'
  },
  {
    id: 'independence',
    learningFunction: 'independence',
    chapter: 'Indépendance',
    title: 'La ligne suspendue',
    prompt: 'Observe un tour. Prévois les tours qui restent jusqu’à l’Arrivée.',
    mode: 'prediction',
    representation: 'line',
    setting: 'summit',
    support: 'minimal',
    variants: [
      { id: 'independence-a', origin: { x: 28, y: 96 }, unit: { x: 12, y: -10 }, totalRolls: 5 },
      { id: 'independence-b', origin: { x: 26, y: 96 }, unit: { x: 13, y: -9 }, totalRolls: 6 }
    ],
    success: 'La prévision conduit exactement le rouleau jusqu’à la dernière balise.'
  }
];

export function requiredRemaining(variant: Variant): number {
  return variant.totalRolls - 1;
}

export function pointAt(variant: Variant, rollIndex: number): Point {
  return {
    x: variant.origin.x + variant.unit.x * rollIndex,
    y: variant.origin.y + variant.unit.y * rollIndex
  };
}

export function vectorLength(vector: Point): number {
  return Math.hypot(vector.x, vector.y);
}

export function vectorAngle(vector: Point): number {
  return Math.atan2(vector.y, vector.x) * (180 / Math.PI);
}

export function selectVariant(scene: Scene, generation: number): Variant {
  return scene.variants[(generation + scenes.indexOf(scene)) % scene.variants.length];
}

function inSafeWorld(point: Point): boolean {
  return point.x >= WORLD.safeMargin
    && point.x <= WORLD.width - WORLD.safeMargin
    && point.y >= WORLD.safeMargin
    && point.y <= WORLD.height - WORLD.safeMargin;
}

export function validateContent(): void {
  for (const scene of scenes) {
    if (scene.variants.length === 0) throw new Error(`${scene.id}: at least one variant is required.`);
    for (const variant of scene.variants) {
      const remaining = requiredRemaining(variant);
      if (remaining < 1 || remaining > WORLD.acceptedPredictionMax) {
        throw new Error(`${variant.id}: remaining-roll count must be between 1 and ${WORLD.acceptedPredictionMax}.`);
      }
      if (vectorLength(variant.unit) <= 0) throw new Error(`${variant.id}: unit vector must be non-zero.`);
      const finish = pointAt(variant, variant.totalRolls);
      const maximumLanding = pointAt(variant, WORLD.acceptedPredictionMax + 1);
      const landingIsSafe = scene.mode === 'tutorial' || inSafeWorld(maximumLanding);
      if (!inSafeWorld(variant.origin) || !inSafeWorld(finish) || !landingIsSafe) {
        throw new Error(`${variant.id}: origin, finish, and every accepted landing must remain inspectable.`);
      }
    }
  }
}

validateContent();
