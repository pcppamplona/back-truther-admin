import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createAuditLogController } from "../../controllers/audit-logs/create-audit-log-controller";
import { getAuditLogByIdController } from "../../controllers/audit-logs/get-audit-log-by-id-controller";
import { listAuditLogsPaginatedController } from "../../controllers/audit-logs/list-audit-logs-paginated-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getAuditLogTicketController } from "../../controllers/audit-logs/get-audit-log-ticket-controller";
import { checkPermission } from "../../middlewares/check-permission";
import { getPaginatedAuditLogsByUserIdController } from "../../controllers/audit-logs/get-paginated-audit-logs-by-user-id-controller";

export async function auditLogsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/audit-logs",
    {
      preHandler: [verifyJwt(), checkPermission("audit-logs:read")],
      schema: {
        tags: ["Logs de Auditoria"],
        summary:
          "Listar logs de auditoria com paginação e filtros (requer autenticação)",
      },
    },
    listAuditLogsPaginatedController
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/audit-logs/:id",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Logs de Auditoria"],
          summary: "Obter log de auditoria por ID (requer autenticação)",
        },
      },
      getAuditLogByIdController
    ),
    app.withTypeProvider<ZodTypeProvider>().post(
      "/audit-logs",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Logs de Auditoria"],
          summary: "Criar um novo log de auditoria (requer autenticação)",
        },
      },
      createAuditLogController
    ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/audit-logs/ticket/:ticket_id",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["Logs de Auditoria"],
          summary:
            "Obter log de auditoria de um ticket por ID (requer autenticação)",
        },
      },
      getAuditLogTicketController
    ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/audit-logs/user/:user_id",
      {
        schema: {
          tags: ["Logs de Auditoria"],
          summary:
            "Listar logs de auditoria por usuário (paginado e filtrável)",
        },
      },
      getPaginatedAuditLogsByUserIdController
    );
}
