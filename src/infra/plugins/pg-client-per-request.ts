import fp from "fastify-plugin";
import { PostgresDatabase } from "../db/pg/connection";

export const pgClientPerRequest = fp(async (app) => {
  app.addHook("onRequest", async (req, reply) => {
    req.pgClient = await PostgresDatabase.getClient();
  });

  app.addHook("onResponse", async (req, reply) => {
    if (req.pgClient) req.pgClient.release();
  });
});