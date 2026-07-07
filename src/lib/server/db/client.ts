import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { dirname, resolve } from 'node:path';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import * as schema from './schema';

let sqlite: Database.Database | undefined;
let schemaReady = false;

export function getDatabasePath(): string {
  const configured = process.env.DATABASE_URL?.replace(/^file:/, '') ?? './data/classroom.sqlite';
  return resolve(process.cwd(), configured);
}

function runFoundationMigration(database: Database.Database): void {
  if (schemaReady) return;

  const migrationPath = resolve(process.cwd(), 'migrations/0000_foundation.sql');
  if (!existsSync(migrationPath)) {
    throw new Error(`Migration introuvable: ${migrationPath}`);
  }

  database.exec(readFileSync(migrationPath, 'utf8'));
  schemaReady = true;
}

export function getSqlite(): Database.Database {
  if (!sqlite) {
    const databasePath = getDatabasePath();
    mkdirSync(dirname(databasePath), { recursive: true });
    sqlite = new Database(databasePath);
    sqlite.pragma('journal_mode = WAL');
    sqlite.pragma('foreign_keys = ON');
  }

  runFoundationMigration(sqlite);
  return sqlite;
}

export function getDb() {
  return drizzle(getSqlite(), { schema });
}

export type ClassroomDb = ReturnType<typeof getDb>;
