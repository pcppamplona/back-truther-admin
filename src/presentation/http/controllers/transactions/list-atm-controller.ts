import { FastifyReply, FastifyRequest } from "fastify";
import { makeListAtmPaginatedUseCase } from "@/application/factories/transactions/make-list-atm-paginated";
import { makeCreateAuditLogUseCase } from "@/application/factories/audit-logs/make-create-audit-log";

export async function listAtmPaginatedController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const {
    page = "1",
    limit = "100",
    sortBy,
    sortOrder,
    created_after,
    created_before,
    txid,
    sender,
    sender_name,
    sender_document,
    receiverDocument,
    receiverName,
    status_bk,
    status_px,
  } = req.query as any;

  const filters: Record<string, any> = {};
  const assignIfDefined = (key: string, value: any) => {
    if (value !== undefined && value !== null && value !== "") {
      filters[key] = value;
    }
  };

  assignIfDefined("txid", txid);
  assignIfDefined("sender", sender);
  assignIfDefined("sender_name", sender_name);
  assignIfDefined("sender_document", sender_document);
  assignIfDefined("receiverDocument", receiverDocument);
  assignIfDefined("receiverName", receiverName);
  assignIfDefined("status_bk", status_bk);
  assignIfDefined("status_px", status_px);
  assignIfDefined("created_after", created_after);
  assignIfDefined("created_before", created_before);
  assignIfDefined("sortBy", sortBy);
  assignIfDefined("sortOrder", sortOrder);

  if (Object.keys(filters).length > 0) {
    try {
      const auditUseCase = makeCreateAuditLogUseCase();
      await auditUseCase.execute({
        method: "GET",
        action: "listing",
        message: `User ${req.user?.name ?? ""} applied filters to search for ATM transactions`,
        description: JSON.stringify(filters),
        sender_type: "ADMIN",
        sender_id: String(req.user?.sub ?? ""),
        target_type: "ADMIN",
        target_id: "",
      });
    } catch (err) {
      req.log?.warn({ err }, "Failed to create audit log for ATM filters");
    }
  }

  const useCase = makeListAtmPaginatedUseCase();

  const result = await useCase.execute({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sortBy,
    sortOrder,
    created_after,
    created_before,
    txid,
    sender,
    sender_name,
    sender_document,
    receiverDocument,
    receiverName,
    status_bk,
    status_px,
  });

  return reply.status(200).send(result);
}