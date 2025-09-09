import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createSystemController } from "../../controllers/systems/create-system-controller";
import { getSystemController } from "../../controllers/systems/get-system-controller";
import { listSystemsController } from "../../controllers/systems/list-systems-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function systemsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/systems",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Systems"],
        summary: "List all systems (requires authentication)",
      },
    },
    listSystemsController
  ),
  app.withTypeProvider<ZodTypeProvider>().get(
    "/systems/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Systems"],
        summary: "Get system by ID (requires authentication)",
      },
    },
    getSystemController
  ),
  app.withTypeProvider<ZodTypeProvider>().post(
    "/systems",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Systems"],
        summary: "Create a new system (requires authentication)",
      },
    },
    createSystemController
  );
}