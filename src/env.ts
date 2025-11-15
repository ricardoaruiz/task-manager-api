import { config } from 'dotenv'
import z4 from 'zod/v4'

const envFilePath = `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`
config({ path: envFilePath })

const ENVIRONMENT_VARIABLES_SCHEMA = z4.object({
  PORT: z4.coerce.number(),
  PERSISTENCE_TYPE: z4.enum(['in-memory', 'database']),
  DATABASE_URL: z4.string(),
  JWT_SECRET: z4.string(),
})

const envVariables = ENVIRONMENT_VARIABLES_SCHEMA.parse(process.env)

export default envVariables
