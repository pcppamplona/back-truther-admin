import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getWalletsByClientDocumentController } from "../../controllers/wallets/get-wallets-by-client-document";

export async function walletRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/client/wallet/:document",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Wallets"],
        summary: "Get wallets by client document (requires authentication)",

      },
    },
    getWalletsByClientDocumentController
  )
}
