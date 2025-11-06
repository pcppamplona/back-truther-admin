import { FastifyReply, FastifyRequest } from "fastify";

import { makeAuthenticateUseCase } from "@/application/factories/make-authenticate-user";
import { authenticateInputSchema } from "../schemas/authenticate.schema";
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions.repository";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = authenticateInputSchema.parse(request.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  const { user } = await authenticateUseCase.execute({ username, password });

  void request.audit({
    action: 'security',
    message: 'User login',
    description: `User ${user.username} (${user.name}) logged in`,
    senderType: 'USER',
    senderId: String(user.id),
    targetType: 'ADMIN',
    targetId: '1'
  })

  const token = request.server.generateJwt({
    sub: user.id,
    role: user.role_id,
    name: user.name
  });

  const rolePermissionsRepo = new PgRolePermissionsRepository();
  const permissions = await rolePermissionsRepo.findDetailsByRoleId(user.role_id);

  return reply.status(200).send({ token, permissions });
}
