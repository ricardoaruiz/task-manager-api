import z from 'zod';
import 'dotenv';

const DEFAULT_MIN_PORT = 3000;
const DEFAULT_MAX_PORT = 8000;

export const envVariablesSchema = z.object({
  PORT: z.coerce
    .number()
    .min(DEFAULT_MIN_PORT, `Port must be at least ${DEFAULT_MIN_PORT}`)
    .max(DEFAULT_MAX_PORT, `Port must be at most ${DEFAULT_MAX_PORT}`),
});
