import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { globalErrorHandler } from './middleware/global-error-handler.js';
import { healthRoutes } from './routes/health/index.js';
import { tasksRoutes } from './routes/tasks/index.js';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(globalErrorHandler);

app.register(healthRoutes, { prefix: '/health' });
app.register(tasksRoutes, { prefix: '/tasks' });

export { app };
