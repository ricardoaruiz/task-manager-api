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
import { healthRoutes } from './routes/health'
import { tasksRoutes } from './routes/tasks'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// CORS
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // credentials: true,
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

// Scalar API Reference Documentation
app.register(scalarApiReference, {
  routePrefix: '/docs',
})

app.register(healthRoutes, { prefix: '/health' })
app.register(tasksRoutes, { prefix: '/tasks' })

export { app }
