import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { listPixOutPaginatedController } from "../../controllers/transactions/list-pix-out-controller";
import { listPixInPaginatedController } from "../../controllers/transactions/list-pix-in-controller";
import {
  listPixOutQuerySchema,
  listPixInQuerySchema,
  paginatedPixOutResponseSchema,
  paginatedPixInResponseSchema,
  listBilletCashoutQuerySchema,
  paginatedBilletCashoutResponseSchema,
} from "../../schemas/transactions.schema";
import { listBilletCashoutPaginatedController } from "../../controllers/transactions/list-billet-cashout-controller";
import { listBridgePaginatedController } from "../../controllers/transactions/list-bridge-controller";
import { listAllUserTransactionsController } from "../../controllers/transactions/list-all-user-transactions-controller";

export async function transactionsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/pix-out",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary:
          "List Pix Out transactions with filters (requires authentication)",
        querystring: listPixOutQuerySchema,
        response: {
          200: paginatedPixOutResponseSchema,
        },
      },
    },
    listPixOutPaginatedController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/pix-in",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary:
          "List Pix In transactions with filters (requires authentication)",
        querystring: listPixInQuerySchema,
        response: {
          200: paginatedPixInResponseSchema,
        },
      },
    },
    listPixInPaginatedController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/billet-cashout",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary:
          "List billet cashout transactions with filters (requires authentication)",
        // querystring: listBilletCashoutQuerySchema,
        // response: {
        //   200: paginatedBilletCashoutResponseSchema,
        // },
      },
    },
    listBilletCashoutPaginatedController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/bridges",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary:
          "List bridges transactions with filters (requires authentication)",
      },
    },
    listBridgePaginatedController
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/transactions/by-document/:document",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Transactions"],
          summary: "List all user transactions by document (banks + admin)",
        },
      },
      listAllUserTransactionsController
    );
}
