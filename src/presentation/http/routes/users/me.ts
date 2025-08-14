import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getMeController } from "../../controllers/user/get-me-controller";

export async function meRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/me",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Users"],
        summary: "Get authenticated user info",
      },
    },
    getMeController
  );
}
