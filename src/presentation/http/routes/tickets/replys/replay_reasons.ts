import { verifyJwt } from "@/presentation/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function replyReasonsRoutes(app: FastifyInstance) {
    // app.withTypeProvider<ZodTypeProvider>().get(
    //      "/reasons",
    //      {
    //        preHandler: [verifyJwt()],
    //        schema: {
    //          tags: ["Ticket"],
    //          summary:
    //            "Get all reasons (requires authentication)",
    //        },
    //      },
    //      getReplyReasonsController
    //    );
}