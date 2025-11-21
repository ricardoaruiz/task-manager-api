import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import envVariables from './env'
import { authRoutes } from './routes/auth'
import { healthRoutes } from './routes/health'
import { profileRoutes } from './routes/profile'
import { tasksRoutes } from './routes/tasks'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cookie)

// CORS
app.register(cors, {
  origin: envVariables.ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
})

// Swagger API Documentation
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Task Manager API',
      description: 'API documentation for the Task Manager service',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

// Scalar API Reference Documentation API
app.register(scalarApiReference, {
  routePrefix: '/docs',
})

app.register(healthRoutes, { prefix: '/health' })
app.register(authRoutes, { prefix: '/auth' })
app.register(profileRoutes, { prefix: '/profile' })
app.register(tasksRoutes, { prefix: '/tasks' })

export { app }




