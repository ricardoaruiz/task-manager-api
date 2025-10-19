import 'dotenv'
import z from "zod";

export const envVariablesSchema = z.object({
  PORT: z.coerce.number().min(3000, "Port must be at least 3000").max(8000, "Port must be at most 8000"),
});
