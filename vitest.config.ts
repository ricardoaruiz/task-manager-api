import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules',
        'dist/**/*',
        'src/app.ts',
        'src/env.ts',
        'src/server.ts',
        'src/@types/**',
        'src/repositories/interfaces/**/*',
        'src/repositories/in-memory/**/*',
        'src/use-cases/errors/**',
      ],
    },
  },
})
