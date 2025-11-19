import { FastifyReply, FastifyRequest } from "fastify";

import { makeAuthenticateUseCase } from "@/application/factories/make-authenticate-user";
import { authenticateInputSchema } from "../schemas/authenticate.schema";
import { PgRolePermissionsRepository } from "@/infra/db/repositories/pg/pg-role-permissions-repository";
import { PgUserPermissionsRepository } from "@/infra/db/repositories/pg/pg-user-permissions-repository";

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
  const rolePermissions = await rolePermissionsRepo.findDetailsByRoleId(user.role_id);

  const userPermissionsRepo = new PgUserPermissionsRepository();
  const userPermissions = await userPermissionsRepo.findDetailsByUserId(user.id);

  const map = new Map<string, { key_name: string; description: string | null }>();
  for (const p of rolePermissions) map.set(p.key_name, p);
  for (const p of userPermissions) if (!map.has(p.key_name)) map.set(p.key_name, p);
  const permissions = Array.from(map.values()).sort((a, b) => a.key_name.localeCompare(b.key_name));

  return reply.status(200).send({ token, permissions });
}
