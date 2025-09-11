import { FastifyReply, FastifyRequest } from "fastify";

import { makeAuthenticateUseCase } from "@/application/factories/make-authenticate-user";
import { makeAuditLogService } from "@/application/factories/audit-logs/make-audit-log-service";
import { authenticateInputSchema } from "../schemas/authenticate.schema";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = authenticateInputSchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  const { user } = await authenticateUseCase.execute({ username, password });

  const auditLogService = makeAuditLogService();
  await auditLogService.logAction({
    method: 'POST',
    action: 'security',
    message: 'User login',
    description: `User ${user.username} (${user.name}) logged in`,
    senderType: 'USER',
    senderId: user.id.toString(),
    targetType: 'ADMIN',
    targetId: ''
  });
  
  const token = request.server.generateJwt({
    sub: user.id,
    role: user.groupLevel,
  });
  return reply.status(200).send({ token });
}
