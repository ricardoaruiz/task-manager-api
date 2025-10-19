import type { Knex } from 'knex';

import { envVariables } from './src/env-variables/index.js';

const isSQLite = envVariables.DATABASE_CLIENT === 'sqlite3';
const connection = isSQLite
  ? { filename: envVariables.DATABASE_URL ?? './dev.sqlite3' }
  : envVariables.DATABASE_URL;

const knexConfig: Knex.Config = {
  client: envVariables.DATABASE_CLIENT,
  connection,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/database/migrations',
  },
};

export default knexConfig;
