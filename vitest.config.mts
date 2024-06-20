import { fileURLToPath } from 'url';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/playwright/**', 'tests/vscode/**'],
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    passWithNoTests: true,
  },
});
