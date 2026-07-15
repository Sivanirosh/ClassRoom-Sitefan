import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { defineConfig } from '@playwright/test';

const requestedPort = process.env.SMOKE_PORT;
const smokePort = requestedPort === undefined ? 10_000 + (process.pid % 50_000) : Number(requestedPort);
if (!Number.isInteger(smokePort) || smokePort < 1 || smokePort > 65_535) {
  throw new Error('SMOKE_PORT must be an integer from 1 through 65535.');
}
process.env.SMOKE_PORT = String(smokePort);

const smokeBaseUrl = `http://127.0.0.1:${smokePort}`;

export default defineConfig({
  testDir: './tests/smoke',
  outputDir: join(tmpdir(), `classroom-exercise-lab-smoke-results-${smokePort}`),
  fullyParallel: false,
  workers: 1,
  timeout: 15 * 60 * 1000,
  expect: {
    timeout: 5_000
  },
  reporter: 'line',
  use: {
    baseURL: smokeBaseUrl,
    browserName: 'chromium',
    channel: 'chrome',
    headless: true
  },
  webServer: {
    command: 'node tests/smoke/vite-server.mjs',
    url: smokeBaseUrl,
    reuseExistingServer: false,
    timeout: 120_000
  }
});
