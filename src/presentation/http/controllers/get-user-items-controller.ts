import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserItemsUseCase } from '@/application/factories/user/make-get-user-items';

interface GetUserItemsParams {
    id: string;
}

export async function getUserItemsController(
    request: FastifyRequest<{ Params: GetUserItemsParams }>,
    reply: FastifyReply,
) {
    const userId = Number(request.params.id);

    const getUserItemsUseCase = makeGetUserItemsUseCase();

    const { items } = await getUserItemsUseCase.execute({ userId });

    return reply.status(200).send({ items });
}