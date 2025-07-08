import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserVisibleGroupIdsUseCase } from '@/application/factories/make-get-user-visible-group-ids'
import { PgItemRepository } from '@/infra/db/repositories/pg/pg-item-repository'

export async function GetUserVisibleItemsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = Number(request.params['userId'])
  if (isNaN(userId)) {
    return reply.status(400).send({ message: 'ID de usuário inválido' })
  }

  const getUserVisibleGroupIdsUseCase = makeGetUserVisibleGroupIdsUseCase()
  const { groupIds } = await getUserVisibleGroupIdsUseCase.execute({ userId })

  const itemRepository = new PgItemRepository()
  const items = await itemRepository.findItemsByGroupIds(groupIds)

  return reply.status(200).send({ items })
}
