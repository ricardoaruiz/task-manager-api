import 'knex';
import type { Task } from '../@types/domain.js';

declare module 'knex/types/tables.js' {
  export interface Tables {
    tasks: Task;
  }
}
