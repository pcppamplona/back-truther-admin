import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getTicketsController } from "../../controllers/tickets/get-tickets-controller";
import { getTicketByIdController } from "../../controllers/tickets/get-ticket-by-id-controller";
import { createTicketController } from "../../controllers/tickets/create-ticket-controller";
import { updateTicketController } from "../../controllers/tickets/update-ticket-controller";
import {
  updateTicketBodySchema,
  updateTicketParamsSchema,
} from "../../schemas/updat-ticket.schema";
import { getTicketCommentController } from "../../controllers/tickets/get-ticket-comment-controller";
import { createTicketCommentController } from "../../controllers/tickets/create-ticket-comment-controller";

export async function ticketsRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
      "/tickets",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket"],
          summary:
            "Get all tickets for user role permissions (requires authentication)",
        },
      },
      getTicketsController
    ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/tickets/:id",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket"],
          summary: "Get ticket by id (requires authentication)",
        },
      },
      getTicketByIdController
    ),
    app.withTypeProvider<ZodTypeProvider>().post(
      "/tickets",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket"],
          summary: "create ticket (requires authentication)",
        },
      },
      createTicketController
    ),
    app.withTypeProvider<ZodTypeProvider>().patch(
      "/tickets/:id",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket"],
          summary: "update ticket (requires authentication)",
          params: updateTicketParamsSchema,
          body: updateTicketBodySchema,
        },
      },
      updateTicketController
    );

    //rotas da criação de comentário
     app.withTypeProvider<ZodTypeProvider>().post(
      "/tickets/comments",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket comment"],
          summary: "create ticket comment (requires authentication)",
        },
      },
      createTicketCommentController
    ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/tickets/comments:ticket_id",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket comment"],
          summary: "get all tickets comment (requires authentication)",
        },
      },
      getTicketCommentController
    );
}
