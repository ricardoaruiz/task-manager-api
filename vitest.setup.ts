import { execSync } from 'node:child_process';
import { afterAll, beforeAll } from 'vitest';
import { app } from './src/app.js';
import { db } from './src/database/db.js';
import { envVariables } from './src/env-variables/env-variables.js';

beforeAll(async () => {
  await app.ready();

  execSync(`rm -rf ${envVariables.DATABASE_URL}`);
  await db.migrate.latest();
});

afterAll(async () => {
  await app.close();
  execSync(`rm -rf ${envVariables.DATABASE_URL}`);
});
