import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

import { verifyJwt } from "../../middlewares/verify-jwt";
import { listPixOutPaginatedController } from "../../controllers/transactions/list-pix-out-controller";
import { listPixInPaginatedController } from "../../controllers/transactions/list-pix-in-controller";
import { exportPixOutCsvController } from "../../controllers/transactions/export-pix-out-csv-controller";
import { exportPixInCsvController } from "../../controllers/transactions/export-pix-in-csv-controller";
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
import { listAtmPaginatedController } from "../../controllers/transactions/list-atm-controller";
import { exportBilletCashoutCsvController } from "../../controllers/transactions/export-billet-cashout-csv-controller";
import { exportBridgeCsvController } from "../../controllers/transactions/export-bridge-csv-controller";
import { exportAtmCsvController } from "../../controllers/transactions/export-atm-csv-controller";
import { exportByDocumentCsvController } from "../../controllers/transactions/export-by-document-csv-controller";

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
    "/transactions/pix-out/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export Pix Out transactions as CSV (no pagination)",
        querystring: listPixOutQuerySchema,
      },
    },
    exportPixOutCsvController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/pix-in/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export Pix In transactions as CSV (no pagination)",
        querystring: listPixInQuerySchema,
      },
    },
    exportPixInCsvController
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
    "/transactions/billet-cashout/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export Billet Cashout transactions as CSV (no pagination)",
        querystring: listBilletCashoutQuerySchema,
      },
    },
    exportBilletCashoutCsvController
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
    "/transactions/bridges/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export Bridge transactions as CSV (no pagination)",
      },
    },
    exportBridgeCsvController
  );
  
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

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/by-document/:document/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export all user transactions by document as CSV (no pagination)",
      },
    },
    exportByDocumentCsvController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/atm",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary:
          "List Atm cashout transactions with filters (requires authentication)",
      },
    },
    listAtmPaginatedController
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/transactions/atm/csv",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Transactions"],
        summary: "Export ATM cashout transactions as CSV (no pagination)",
      },
    },
    exportAtmCsvController
  );
}
