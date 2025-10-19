import fastify from "fastify";
import { healthRoutes } from "./routes/health/index.js";

const app = fastify();

app.register(healthRoutes, { prefix: "/health" });

export { app };
