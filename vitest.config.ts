import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: [],
    setupFiles: ['./vitest.setup.ts'],
  },
});
