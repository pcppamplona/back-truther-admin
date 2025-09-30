import { makeGetAuditLogTicketUseCase } from "@/application/factories/audit-logs/make-get-audit-log-ticket";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getAuditLogTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    ticket_id: z.coerce.number(),
  });

  const { ticket_id } = paramsSchema.parse(req.params);
  const useCase = makeGetAuditLogTicketUseCase();
  const auditLog = await useCase.execute(ticket_id);

  if (!auditLog) {
    return reply
      .status(404)
      .send({ message: "Log de auditoria não encontrado" });
  }

  return reply.status(200).send(auditLog);
}
