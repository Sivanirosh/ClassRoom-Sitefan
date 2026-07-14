import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const labRoot = fileURLToPath(new URL('../', import.meta.url));
const server = await createServer({
  root: labRoot,
  configFile: false,
  appType: 'custom',
  logLevel: 'error',
  plugins: [svelte()],
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true, hmr: false }
});

try {
  const catalogModule = await server.ssrLoadModule('/src/lib/catalog/discovery.ts');
  const count = Array.isArray(catalogModule.exerciseCatalog)
    ? catalogModule.exerciseCatalog.length
    : 0;
  console.log(`Catalog structure valid (${count} exercise${count === 1 ? '' : 's'}).`);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await server.close();
}
