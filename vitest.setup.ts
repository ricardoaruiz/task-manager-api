import { afterAll, beforeAll } from 'vitest';
import { app } from './src/app.js';

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});
