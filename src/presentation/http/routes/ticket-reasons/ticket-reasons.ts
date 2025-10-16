import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { createTicketReasonController } from "../../controllers/ticket-reasons/create-ticket-reason-controller";
import { patchTicketReasonController } from "../../controllers/ticket-reasons/patch-ticket-reason-controller";
import { getTicketReasonController } from "../../controllers/ticket-reasons/get-ticket-reason-controller";
import { getAllTicketReasonController } from "../../controllers/ticket-reasons/get-all-ticket-reason-controller";
import { deleteTicketReasonController } from "../../controllers/ticket-reasons/delete-ticket-reason-controller";
import { getActionsTypeController } from "../../controllers/ticket-reasons/actions-type/get-actions-type-controller";
import { createActionsTypeController } from "../../controllers/ticket-reasons/actions-type/create-actions-type-controller";
import { deleteActionsTypeController } from "../../controllers/ticket-reasons/actions-type/delete-actions-type-controller";
import { getRepliesByReasonController } from "../../controllers/ticket-reasons/replies/get-replies-by-reason-controller";
import { createReplyController } from "../../controllers/ticket-reasons/replies/create-reply-controller";
import { deleteReplyController } from "../../controllers/ticket-reasons/replies/delete-reply-controller";
import { getActionsByReplyController } from "../../controllers/ticket-reasons/reply-actions/get-actions-by-reply-controller";
import { createReplyActionController } from "../../controllers/ticket-reasons/reply-actions/create-actions-by-reply-controller";
import { deleteReplyActionController } from "../../controllers/ticket-reasons/reply-actions/delete-actions-by-reply-controller";
import { getAllReplyActionsController } from "../../controllers/ticket-reasons/reply-actions/get-all-reply-actions-controller";
import { getAllRepliesController } from "../../controllers/ticket-reasons/replies/get-all-replies-controller";

export async function ticketReasonRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/ticket-reasons",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason"],
        summary: "create ticket reason (requires authentication)",
      },
    },
    createTicketReasonController
  );

  app.withTypeProvider<ZodTypeProvider>().patch(
    "/ticket-reasons/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason"],
        summary: "update ticket reason (requires authentication)",
      },
    },
    patchTicketReasonController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason"],
        summary: "find ticket reason by id (requires authentication)",
      },
    },
    getTicketReasonController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason"],
        summary: "get all ticket reasons (requires authentication)",
      },
    },
    getAllTicketReasonController
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/ticket-reasons/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason"],
        summary: "delete ticket reason (requires authentication)",
      },
    },
    deleteTicketReasonController
  );

  // === ACTIONS TYPE ===
  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/actions-type",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-actions-type"],
        summary:
          "Listar todos os tipos de ações de ticket reason (requer autenticação)",
      },
    },
    getActionsTypeController
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/ticket-reasons/actions-types",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-actions-type"],
        summary:
          "Listar todos os tipos de ações de ticket reason (requer autenticação)",
      },
    },
    createActionsTypeController
  );

  app.withTypeProvider<ZodTypeProvider>().delete(   
    "/ticket-reasons/actions-type/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-actions-type"],
        summary:
          "Excluir tipo de ação de ticket reason pelo ID (requer autenticação)",
      },
    },
    deleteActionsTypeController
  );

  // === REPLIES ===
  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/:reason_id/replies",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-replies"],
        summary:
          "Listar replies vinculados a um ticket reason (requer autenticação)",
      },
    },
    getRepliesByReasonController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/replies",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-replies"],
        summary: "get all ticket reasons (requires authentication)",
      },
    },
    getAllRepliesController
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/ticket-reasons/:reason_id/replies",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-replies"],
        summary:
          "Criar novo reply vinculado a um ticket reason (requer autenticação)",
      },
    },
    createReplyController
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/ticket-reasons/replies/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-replies"],
        summary: "Excluir reply de ticket reason pelo ID (requer autenticação)",
      },
    },
    deleteReplyController
  );

  // === REPLY ACTIONS ===
  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/replies/:reply_id/actions",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-reply-actions"],
        summary:
          "Listar ações associadas a um reply de ticket reason (requer autenticação)",
      },
    },
    getActionsByReplyController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/ticket-reasons/replies/actions",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-reply-actions"],
        summary: "get all ticket reasons (requires authentication)",
      },
    },
    getAllReplyActionsController
  );

  app.withTypeProvider<ZodTypeProvider>().post(
    "/ticket-reasons/replies/:reply_id/actions",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-reply-actions"],
        summary:
          "Criar nova ação associada a um reply de ticket reason (requer autenticação)",
      },
    },
    createReplyActionController
  );

  app.withTypeProvider<ZodTypeProvider>().delete(
    "/ticket-reasons/replies/actions/:id",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["ticket-reason-reply-actions"],
        summary:
          "Excluir ação de reply de ticket reason pelo ID (requer autenticação)",
      },
    },
    deleteReplyActionController
  );
}
