import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { getUsersController } from "../../controllers/user/get-users-controller";
import { listUsersPaginatedController } from "../../controllers/user/list-users-paginated-controller";

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/users",
    {
      preHandler: [verifyJwt()],
      schema: {
        tags: ["Users"],
        summary: "Get all users (requires authentication)",
      },
    },
    getUsersController
  ),
    app.withTypeProvider<ZodTypeProvider>().get(
      "/users/paginated",
      {
        preHandler: [verifyJwt()],
        schema: {
          tags: ["users"],
          summary: "List users with pagination and filters",
        },
      },
      listUsersPaginatedController
    );
}
