import { makeUpdateTicketUseCase } from '@/application/factories/tickets/make-update-ticket';
import { FastifyRequest, FastifyReply } from 'fastify'

export async function updateTicketController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = req.params as { id: number };
  const { body } = req;
  
  const useCase = makeUpdateTicketUseCase();
  const ticket = await useCase.execute(id, body as any);

  return reply.status(200).send(ticket);
}
