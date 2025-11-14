import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src', // Include all files in the 'src' directory
    '!src/**/__tests__/**', // Exclude files within '__tests__' subdirectories
    '!src/**/*.test.*', // Exclude files with '.test.' in their name (e.g., .test.ts, .test.js)
    '!src/**/*.spec.*', // Exclude files with '.spec.' in their name (e.g., .spec.ts, .spec.js)
    '!src/db/**',
  ],
  format: ['cjs'],
  clean: true,
  // Other tsup configurations (e.g., format, outDir, clean)
})
