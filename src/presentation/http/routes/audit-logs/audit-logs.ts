import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createAuditLogController } from "../../controllers/audit-logs/create-audit-log-controller";
import { listAuditLogsController } from "../../controllers/audit-logs/list-audit-logs-controller";
import { listAuditLogsPaginatedController } from "../../controllers/audit-logs/list-audit-logs-paginated-controller";
import { verifyJwt } from "../../middlewares/verify-jwt";

export async function auditLogsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/audit-logs",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Audit Logs"],
        summary: "List all audit logs (requires authentication)",
      },
    },
    listAuditLogsController
  ),
  app.withTypeProvider<ZodTypeProvider>().get(
    "/audit-logs/paginated",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Audit Logs"],
        summary: "List audit logs with pagination and filters (requires authentication)",
      },
    },
    listAuditLogsPaginatedController
  ),
  app.withTypeProvider<ZodTypeProvider>().post(
    "/audit-logs",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Audit Logs"],
        summary: "Create a new audit log (requires authentication)",
      },
    },
    createAuditLogController
  );
}