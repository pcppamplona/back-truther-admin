import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getUsersController } from "../../controllers/user/get-users-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ['Users'],
        summary: 'Get all users (requires authentication)',
        // response: {
        //   200: getUsersOutputSchema
        // }
      }
    },
    getUsersController
  )
}