const databaseUrl = process.env.DATABASE_URL?.replace(/^file:/, '') ?? './data/classroom.sqlite';

// Kept as plain configuration documentation for future migration generation.
// The current foundation applies explicit SQL migrations through npm run db:migrate.
export default {
  schema: './src/lib/server/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseUrl
  }
} as const;
