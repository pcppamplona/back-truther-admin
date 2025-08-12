import { FastifyReply, FastifyRequest } from 'fastify'

import { makeSetDecisionKycUseCase } from '@/application/factories/make-set-decision-kyc'
import { setKycDecisionInputSchema } from '@/presentation/http/schemas/set-decision-kyc.schema'

export async function SetDecisionKycController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id, decision, internalComment, externalComment } =
    setKycDecisionInputSchema.parse(request.body)

  const setDecisionKycUseCase = makeSetDecisionKycUseCase()

  const result = await setDecisionKycUseCase.execute({
    id,
    decision,
    internalComment,
    externalComment,
  })


  return reply.status(201).send({ id: result.id })
}
