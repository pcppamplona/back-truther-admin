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
import { getTicketReasonsByCategoryController } from "../../controllers/tickets/get-ticket-reasons-by-category-controller";
import { getTicketReasonsByIdController } from "../../controllers/tickets/get-ticket-reasons-by-id-controller";
import { getTicketReasonsReplyController } from "../../controllers/tickets/get-ticket-reasons-reply-controller";
import { getTicketReasonsReplyActionsController } from "../../controllers/tickets/get-ticket-reasons-reply-actions-controller";
import {
  finalizeTicketBodySchema,
  finalizeTicketParamsSchema,
} from "../../schemas/finalize-ticket.schema";
import { finalizeTicketController } from "../../controllers/tickets/finalize-ticket-controller";
import { GetTicketsPaginatedController } from "../../controllers/tickets/get-tickets-paginated-controller";
import { PaginatedQuerySchema } from "../../schemas/paginated.schema";

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
      "/tickets/paginated",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Ticket"],
          summary:
            "List tickets with pagination and filters (requires authentication)",
          querystring: PaginatedQuerySchema,
        },
      },
      GetTicketsPaginatedController
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

  //rotas para pegar os reasons
  app.withTypeProvider<ZodTypeProvider>().get(
    "/tickets/reasons/category/:category_id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket reason"],
        summary: "get all reasons by category (requires authentication)",
      },
    },
    getTicketReasonsByCategoryController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/tickets/reasons/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket reason"],
        summary: "get all reasons by id (requires authentication)",
      },
    },
    getTicketReasonsByIdController
  );

  //rotas para o reply reasons
  app.withTypeProvider<ZodTypeProvider>().get(
    "/tickets/reasons/reply/:reason_id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket reply"],
        summary: "Get all reply reasons by reason_id",
      },
    },
    getTicketReasonsReplyController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/tickets/reasons/reply/actions/:reply_id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket reply"],
        summary: "Get all reply actions by reply_id",
      },
    },
    getTicketReasonsReplyActionsController
  );

  //rota de finalização do ticket
  app.withTypeProvider<ZodTypeProvider>().patch(
    "/tickets/:id/finalize",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Ticket"],
        summary: "Finaliza ticket, executa actions, cria comentários e audita",
        params: finalizeTicketParamsSchema,
        body: finalizeTicketBodySchema,
      },
    },
    finalizeTicketController
  );
}
