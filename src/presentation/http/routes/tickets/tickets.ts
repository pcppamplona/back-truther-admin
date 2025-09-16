import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getTicketsController } from "../../controllers/tickets/get-tickets-controller";

export async function ticketsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/tickets",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket"],
        summary: "Get all tickets for user role permissions",
      },
    },
    getTicketsController
  );
}
