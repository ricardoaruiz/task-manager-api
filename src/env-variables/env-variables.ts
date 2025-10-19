import 'dotenv/config'
import { envVariablesSchema } from "./env-variables.schema.js";
import z from 'zod';

const environmentVariables = envVariablesSchema.safeParse(process.env);

if (!environmentVariables.success) {

  console.log("=====================================================");
  console.log("❌ Invalid environment variables:");
  console.log(z.prettifyError(environmentVariables.error))
  console.log("=====================================================");

  process.exit(1);
}

const envVariables = environmentVariables.data;

export { envVariables };