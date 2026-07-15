import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build, preview } from 'vite';

const labRoot = fileURLToPath(new URL('../../', import.meta.url));
const configFile = fileURLToPath(new URL('../../vite.config.ts', import.meta.url));
const fixturePath = fileURLToPath(new URL('./contract-fixture.html', import.meta.url));
const fixture = await readFile(fixturePath);
const port = Number(process.env.SMOKE_PORT);
if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('SMOKE_PORT must be provided as an integer from 1 through 65535.');
}

await build({
  root: labRoot,
  configFile,
  configLoader: 'runner',
  logLevel: 'error'
});

const server = await preview({
  root: labRoot,
  configFile,
  configLoader: 'runner',
  logLevel: 'error',
  plugins: [
    {
      name: 'smoke-contract-fixture',
      configurePreviewServer(previewServer) {
        previewServer.middlewares.use('/tests/smoke/contract-fixture.html', (_request, response) => {
          response.setHeader('Content-Type', 'text/html; charset=utf-8');
          response.end(fixture);
        });
      }
    }
  ],
  preview: {
    host: '127.0.0.1',
    port,
    strictPort: true
  }
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, () => {
    server.httpServer.close(() => process.exit(0));
  });
}
