import { makeGetMeUseCase } from '@/application/factories/make-get-me'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getMeController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log("JWT payload:", request.user) 
  const userId = request.user.sub

  const getMeUseCase = makeGetMeUseCase()
  const user = await getMeUseCase.execute({ userId: Number(userId) })

  return reply.status(200).send(user)
}

// export async function getMeController(
//   request: FastifyRequest,
//   reply: FastifyReply
// ) {
//   console.log("JWT payload:", request.user) // <-- ver o que realmente vem

//   const userId = Number(request.user.sub) // conversão explícita
//   if (Number.isNaN(userId)) {
//     throw new Error('Invalid user ID in token')
//   }

//   const getMeUseCase = makeGetMeUseCase()
//   const user = await getMeUseCase.execute({ userId })

//   return reply.status(200).send(user)
// }