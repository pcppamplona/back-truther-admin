import { FastifyReply, FastifyRequest } from "fastify";

import { makeAuthenticateUseCase } from "@/application/factories/make-authenticate-user";
import { authenticateInputSchema } from "../schemas/authenticate.schema";

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

  console.log("-----------")    
  console.log(user.id)
  console.log(user.role_id)
  console.log("-----------")


  const token = request.server.generateJwt({
    sub: user.id,
    role: user.role_id,
    name: user.name
  });
  return reply.status(200).send({ token });
}
