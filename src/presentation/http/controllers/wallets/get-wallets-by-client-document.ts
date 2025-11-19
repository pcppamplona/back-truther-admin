import { makeGetWalletsByClientDocumentUseCase } from "@/application/factories/wallets/make-get-wallets-by-client-document";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getWalletsByClientDocumentController(req: FastifyRequest, reply: FastifyReply) {
  const { document } = req.params as { document: string }

  const useCase = makeGetWalletsByClientDocumentUseCase()

  const wallets = await useCase.execute(document)

  return reply.status(200).send(wallets)
}