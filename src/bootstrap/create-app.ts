import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "@/infra/env";
import jwtPlugin from "@/infra/plugins/jwt";
import swaggerAuth from "@/infra/plugins/swagger-auth";
import auditPlugin from "@/infra/plugins/audit";
import { errorHandler } from "@/presentation/http/middlewares/error-handler";
import { LoggerInterceptor } from "../presentation/http/interceptors/logger-interceptor";
import { registerRoutes } from "../presentation/http/routes";
import { PostgresDatabase } from "@/infra/db/pg/connection";
import { pgClientPerRequest } from "@/infra/plugins/pg-client-per-request";

export async function createApp() {
  await PostgresDatabase.connect(env.DATABASE_URL);
  
  const app = fastify({
    trustProxy: true,
  }).withTypeProvider<ZodTypeProvider>();

  // Set compilers
  app.setSerializerCompiler(serializerCompiler);
  app.setValidatorCompiler(validatorCompiler);

  // Global error handler
  app.setErrorHandler(errorHandler);

  // Plugins
  await app.register(fastifyCors, {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });
  await app.register(jwtPlugin);
  await app.register(swaggerAuth);
  await app.register(auditPlugin);
  await app.register(pgClientPerRequest);

  await app.register(fastifySwagger, {
    openapi: {
      info: {
        title: "APP/SERVICE NAME",
        description: "APP/SERVICE DESCRIPTION",
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  });

  if (env.NODE_ENV === "dev") {
    await app.register(async function (instance) {
      instance.addHook("onRequest", instance.basicAuth);

      await instance.register(fastifySwaggerUI, {
        routePrefix: "/docs",
        staticCSP: true,
      });
    });
  }

  // Interceptors
  LoggerInterceptor.register(app);

  // Register routes
  registerRoutes(app);

  return app;
}
