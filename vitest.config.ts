import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    exclude: [],
    setupFiles: ['./vitest.setup.ts'],
    maxConcurrency: 1,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    coverage: {
      provider: 'v8',
      exclude: [
        '**/tests/**',
        '**/*.spec.ts',
        'src/database/migrations/**',
        'src/@types/**',
        'commitlint.config.cjs',
        'vitest.setup.ts',
        'vitest.config.ts',
        'src/server.ts',
        'knexfile.ts',
        'dist/**',
      ],
    },
  },
});
