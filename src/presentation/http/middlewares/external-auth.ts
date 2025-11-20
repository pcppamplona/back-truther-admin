import { FastifyRequest, FastifyReply } from "fastify";
import { env } from "@/infra/env";
import { getValidExternalToken } from "@/application/services/external-auth-service";

export async function externalAuthHook(req: FastifyRequest, reply: FastifyReply) {
  if (!env.SERVICE_PROXY_URL) {
    return reply.status(500).send({ error: "SERVICE_PROXY_URL not configured" });
  }

  try {
    const token = await getValidExternalToken();
    (req as any).externalToken = token;

    if (req.audit) {
      await req.audit({
        action: "security",
        message: "External authentication",
        description: `Usuário ${req.user?.name} autenticou para acessar serviços externos`,
        method: req.method,
        senderType: "USER",
        senderId: String(req.user?.sub),
        targetType: "ADMIN",
        targetId: "1",
        targetExternalId: null,
        severity: "medium"
      });
    }
  } catch (err) {
    return reply.status(500).send({ error: "External token error", detail: `${err}` });
  }
}
