import { FastifyInstance } from "fastify";

import { authenticateUser } from "./authenticate";
import { createUser } from "./create-user";
import { healthCheck } from "./health-check";
import { userItemsRoutes } from "./user-items";
import { listClientsRoute } from "./list-clients";
import { listUserInfoRoute } from "./list-user-info";

export async function registerRoutes(app: FastifyInstance) {
  await app.register(healthCheck);
  await app.register(createUser);
  await app.register(userItemsRoutes);

  await app.register(authenticateUser);

  await app.register(listClientsRoute);
  await app.register(listUserInfoRoute);
}
