import type { FastifyInstance } from "fastify";
import { healthRoute } from "./health.js";

export async function healthRoutes(app: FastifyInstance) {
  healthRoute(app);
}