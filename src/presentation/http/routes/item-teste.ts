import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { makeListAccessibleItemTesteUseCase } from '@/application/factories/make-list-accessible-item-teste-use-case';

export async function itemTesteRoutes(app: FastifyInstance) {
  app.get('/item-teste', async (request, reply) => {
    const querySchema = z.object({
      userId: z.coerce.number(),
    });

    const { userId } = querySchema.parse(request.query);

    const listAccessibleItemTesteUseCase = makeListAccessibleItemTesteUseCase();

    const { items } = await listAccessibleItemTesteUseCase.execute({ userId });

    return reply.send(items);
  });
}
