import fastify from 'fastify';
import { healthRoutes } from './routes/health/index.js';
import { tasksRoutes } from './routes/tasks/index.js';

const app = fastify();

app.register(healthRoutes, { prefix: '/health' });
app.register(tasksRoutes, { prefix: '/tasks' });

export { app };
