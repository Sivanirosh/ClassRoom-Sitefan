export type WorldId = 'livrets' | 'geometrie' | 'calculs' | 'numeria' | 'pcp';

export type WorldTheme = 'workshop' | 'garden' | 'observatory' | 'kingdom' | 'studio';

export type WorldDefinition = {
  id: WorldId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  eyebrow: string;
  kicker: string;
  skill: string;
  duration: string;
  route: string;
  emoji: string;
  color: string;
  theme: WorldTheme;
};

export const worlds: WorldDefinition[] = [
  {
    id: 'livrets',
    title: "L'Atelier des Livrets",
    shortTitle: 'Atelier des Livrets',
    subtitle: 'Construis tes tables, un groupe après l’autre.',
    description: 'Observe, manipule et trouve tes propres raccourcis pour rendre les multiplications plus faciles.',
    eyebrow: 'La fabrique des multiplications',
    kicker: 'Comprendre avant de mémoriser',
    skill: 'Tables & stratégies',
    duration: '5–8 min',
    route: '/livrets',
    emoji: '✖️',
    color: 'indigo',
    theme: 'workshop'
  },
  {
    id: 'geometrie',
    title: 'Le Défi des Formes',
    shortTitle: 'Défi des Formes',
    subtitle: 'Enquête sur les figures et les solides.',
    description: 'Repère les propriétés, compare les formes et explique ce qui rend chacune d’elles unique.',
    eyebrow: 'Le jardin des formes',
    kicker: 'Observer, comparer, classer',
    skill: 'Géométrie & logique',
    duration: '6–9 min',
    route: '/geometrie',
    emoji: '📐',
    color: 'emerald',
    theme: 'garden'
  },
  {
    id: 'calculs',
    title: 'Le Calcul Décimal',
    shortTitle: 'Calcul Décimal',
    subtitle: 'Aligne les virgules et pilote tes calculs.',
    description: 'Décompose les nombres décimaux, pose ton raisonnement sur l’ardoise et vérifie chaque étape.',
    eyebrow: 'L’observatoire des nombres',
    kicker: 'Aligner, estimer, calculer',
    skill: 'Nombres décimaux',
    duration: '5–8 min',
    route: '/calculs',
    emoji: '🔢',
    color: 'rose',
    theme: 'observatory'
  },
  {
    id: 'numeria',
    title: 'Les Royaumes de Numéria',
    shortTitle: 'Numéria',
    subtitle: 'Explore les secrets de la numération.',
    description: 'Traverse des royaumes de nombres, résous de courtes énigmes et complète ton codex à ton rythme.',
    eyebrow: 'La grande carte des nombres',
    kicker: 'Explorer la numération',
    skill: 'Numération & fractions',
    duration: '5 min / mission',
    route: '/numeria',
    emoji: '📜',
    color: 'purple',
    theme: 'kingdom'
  },
  {
    id: 'pcp',
    title: 'Espace PCP / Orientation',
    shortTitle: 'Atelier Avenir',
    subtitle: 'Donne une forme claire à ton projet.',
    description: 'Avance étape par étape pour préparer un CV, une lettre et parler de tes envies professionnelles.',
    eyebrow: 'L’atelier des projets',
    kicker: 'Imaginer et présenter son avenir',
    skill: 'Expression & orientation',
    duration: '15–25 min',
    route: '/pcp',
    emoji: '💼',
    color: 'amber',
    theme: 'studio'
  }
];

export const worldById = Object.fromEntries(worlds.map((world) => [world.id, world])) as Record<
  WorldId,
  WorldDefinition
>;

export const worldLabels: Record<WorldId, string> = {
  livrets: "L'Atelier des Livrets",
  geometrie: 'Le Défi des Formes',
  calculs: 'Le Calcul Décimal',
  numeria: 'Les Royaumes de Numéria',
  pcp: 'Espace PCP / Orientation'
};
