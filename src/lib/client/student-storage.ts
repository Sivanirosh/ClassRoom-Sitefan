import { browser } from '$app/environment';
import type { WorldId } from '$lib/worlds';

export const STUDENT_DATA_VERSION = 1;
const STORAGE_PREFIX = 'classroom-sitefan';
const JOURNEY_NAMESPACE = 'journey';

type StoredEnvelope<T> = {
  version: number;
  owner: string;
  updatedAt: number;
  data: T;
};

export type StudentWorldJourney = {
  plays: number;
  bestPercent: number;
  lastPercent: number;
  lastScore: number;
  lastTotal: number;
  lastMission: string;
  lastPlayedAt: number;
};

export type StudentJourney = Partial<Record<WorldId, StudentWorldJourney>>;

export type JourneyResult = {
  studentName: string;
  world: WorldId;
  mission: string;
  score: number;
  total: number;
};

function normalizeSegment(value: string, fallback: string): string {
  const normalized = value
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr-FR')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || fallback;
}

function isStoredEnvelope(value: unknown): value is StoredEnvelope<unknown> {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.version === 'number' &&
    typeof record.owner === 'string' &&
    typeof record.updatedAt === 'number' &&
    'data' in record
  );
}

function storageAvailable(): boolean {
  return browser && typeof localStorage !== 'undefined';
}

export function studentStorageKey(
  namespace: string,
  studentName: string,
  version = STUDENT_DATA_VERSION
): string {
  const safeNamespace = normalizeSegment(namespace, 'data');
  const safeStudent = normalizeSegment(studentName, 'explorateur');
  return `${STORAGE_PREFIX}:v${version}:${safeNamespace}:${safeStudent}`;
}

export function readStudentData<T>(
  namespace: string,
  studentName: string,
  fallback: T,
  validate?: (value: unknown) => value is T
): T {
  if (!storageAvailable()) return fallback;

  try {
    const raw = localStorage.getItem(studentStorageKey(namespace, studentName));
    if (!raw) return fallback;

    const parsed: unknown = JSON.parse(raw);
    if (!isStoredEnvelope(parsed) || parsed.version !== STUDENT_DATA_VERSION) return fallback;
    if (parsed.owner !== normalizeSegment(studentName, 'explorateur')) return fallback;
    if (validate && !validate(parsed.data)) return fallback;

    return parsed.data as T;
  } catch {
    return fallback;
  }
}

export function writeStudentData<T>(namespace: string, studentName: string, data: T): boolean {
  if (!storageAvailable()) return false;

  const owner = normalizeSegment(studentName, 'explorateur');
  const envelope: StoredEnvelope<T> = {
    version: STUDENT_DATA_VERSION,
    owner,
    updatedAt: Date.now(),
    data
  };

  try {
    localStorage.setItem(studentStorageKey(namespace, studentName), JSON.stringify(envelope));
    return true;
  } catch {
    return false;
  }
}

export function removeStudentData(namespace: string, studentName: string): boolean {
  if (!storageAvailable()) return false;

  try {
    localStorage.removeItem(studentStorageKey(namespace, studentName));
    return true;
  } catch {
    return false;
  }
}

function isJourney(value: unknown): value is StudentJourney {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;

  return Object.values(value).every((entry) => {
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return false;
    const item = entry as Record<string, unknown>;
    return (
      typeof item.plays === 'number' &&
      typeof item.bestPercent === 'number' &&
      typeof item.lastPercent === 'number' &&
      typeof item.lastScore === 'number' &&
      typeof item.lastTotal === 'number' &&
      typeof item.lastMission === 'string' &&
      typeof item.lastPlayedAt === 'number'
    );
  });
}

function safePercent(score: number, total: number): number {
  if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.round(Math.min(100, Math.max(0, (score / total) * 100)));
}

export function getStudentJourney(studentName: string): StudentJourney {
  return readStudentData<StudentJourney>(JOURNEY_NAMESPACE, studentName, {}, isJourney);
}

export const getLocalJourney = getStudentJourney;

export function recordJourneyResult(result: JourneyResult): StudentJourney {
  const journey = getStudentJourney(result.studentName);
  const previous = journey[result.world];
  const lastPercent = safePercent(result.score, result.total);
  const next: StudentWorldJourney = {
    plays: (previous?.plays ?? 0) + 1,
    bestPercent: Math.max(previous?.bestPercent ?? 0, lastPercent),
    lastPercent,
    lastScore: Number.isFinite(result.score) ? result.score : 0,
    lastTotal: Number.isFinite(result.total) && result.total > 0 ? result.total : 1,
    lastMission: result.mission.trim().slice(0, 140) || 'Mission',
    lastPlayedAt: Date.now()
  };
  const updated: StudentJourney = { ...journey, [result.world]: next };
  writeStudentData(JOURNEY_NAMESPACE, result.studentName, updated);
  return updated;
}

export const recordLocalActivity = recordJourneyResult;
