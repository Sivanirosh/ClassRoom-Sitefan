import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [svelte()],
  server: {
    host: '127.0.0.1',
    strictPort: true
  },
  build: {
    rollupOptions: {
      input: {
        home: fromRoot('./index.html'),
        catalog: fromRoot('./catalog/index.html'),
        exercise: fromRoot('./exercise/index.html'),
        runner: fromRoot('./runner/index.html')
      }
    }
  }
});
