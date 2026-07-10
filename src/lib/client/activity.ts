import { browser } from '$app/environment';
import { recordLocalActivity } from '$lib/client/student-storage';
import type { WorldId } from '$lib/worlds';

const STUDENT_STORAGE_KEY = 'nomEleve';

export type ActivityPayload = {
  studentName: string;
  world: WorldId;
  mission: string;
  score: number;
  total: number;
  scoreBasis?: 'last' | 'best';
  errorCount?: number;
  errorFamilies?: unknown;
  metadata?: unknown;
};

export function getStudentName(fallback = 'Explorateur'): string {
  if (!browser) return fallback;

  try {
    const fromUrl = new URLSearchParams(window.location.search).get('eleve');
    const fromStorage = sessionStorage.getItem(STUDENT_STORAGE_KEY);
    const studentName = (fromUrl || fromStorage || fallback).trim();

    if (studentName) sessionStorage.setItem(STUDENT_STORAGE_KEY, studentName);
    return studentName || fallback;
  } catch {
    return fallback;
  }
}

export function storeStudentName(studentName: string): void {
  if (!browser) return;
  try {
    sessionStorage.setItem(STUDENT_STORAGE_KEY, studentName.trim());
  } catch {
    // A private or restricted browser may refuse storage; the current page can still work.
  }
}

export function clearStudentName(): void {
  if (!browser) return;
  try {
    sessionStorage.removeItem(STUDENT_STORAGE_KEY);
  } catch {
    // Nothing else is required when session storage is unavailable.
  }
}

export async function submitActivityResult(payload: ActivityPayload): Promise<{ ok: boolean; message: string }> {
  recordLocalActivity(payload);

  try {
    const response = await fetch('/api/activity-results', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const message = await response.text();
      return {
        ok: false,
        message: message || 'Ton résultat est gardé sur cet appareil, mais le tableau enseignant est momentanément indisponible.'
      };
    }

    return { ok: true, message: 'Résultat gardé dans ton carnet et transmis à l’enseignant.' };
  } catch {
    return {
      ok: false,
      message: 'Ton résultat est gardé sur cet appareil. Il pourra être rejoué même si le serveur est indisponible.'
    };
  }
}
