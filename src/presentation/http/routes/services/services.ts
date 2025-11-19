import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { verifyJwt } from '../../middlewares/verify-jwt'
import { env } from '@/infra/env'

const proxyBase = env.SERVICE_PROXY_URL || process.env.SERVICE_PROXY_URL

export async function servicesRoutes(app: FastifyInstance) {
  const basePath = '/services'

  app.withTypeProvider<ZodTypeProvider>().get(
    `${basePath}/get-services`,
    {
      preHandler: [verifyJwt()],
      schema: { 
        tags: ['Services'],
        summary: 'Proxy to external get-services'
      },
    },
    async (req, reply) => {
      if (!proxyBase) return reply.status(500).send({ error: 'SERVICE_PROXY_URL not configured' })
      const res = await fetch(`${proxyBase}/services/get-services`, {
        headers: { authorization: (req.headers.authorization as string) || '' },
      })
      const json = await res.json().catch(() => null)
      return reply.status(res.status).send(json)
    }
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    `${basePath}/block-levels`,
    {
      preHandler: [verifyJwt()],
      schema: { 
        tags: ['Services'], 
        summary: 'Proxy to external block-levels' 
      },
    },
    async (req, reply) => {
      if (!proxyBase) return reply.status(500).send({ error: 'SERVICE_PROXY_URL not configured' })
      const res = await fetch(`${proxyBase}/services/block-levels`, {
        headers: { authorization: (req.headers.authorization as string) || '' },
      })
      const json = await res.json().catch(() => null)
      return reply.status(res.status).send(json)
    }
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    `${basePath}/block-levels/users/:user_id/tag/:tag`,
    {
      preHandler: [verifyJwt()],
      schema: { 
        tags: ['Services'], 
        summary: 'Proxy to set user block level (PUT)' },
    },
    async (req, reply) => {
      if (!proxyBase) return reply.status(500).send({ error: 'SERVICE_PROXY_URL not configured' })
      const { user_id, tag } = req.params as any
      const res = await fetch(`${proxyBase}/services/block-levels/users/${user_id}/tag/${tag}`, {
        method: 'PUT',
        headers: {
          authorization: (req.headers.authorization as string) || '',
          'content-type': 'application/json',
        },
        body: JSON.stringify(req.body || {}),
      })
      const json = await res.json().catch(() => null)
      return reply.status(res.status).send(json)
    }
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    `${basePath}/block-levels/users/:user_id`,
    {
      preHandler: [verifyJwt()],
      schema: { 
        tags: ['Services'], 
        summary: 'Proxy to clear user block level (DELETE)' 
      },
    },
    async (req, reply) => {
      if (!proxyBase) return reply.status(500).send({ error: 'SERVICE_PROXY_URL not configured' })
      const { user_id } = req.params as any
      const res = await fetch(`${proxyBase}/services/block-levels/users/${user_id}`, {
        method: 'DELETE',
        headers: { authorization: (req.headers.authorization as string) || '' },
      })
      const json = await res.json().catch(() => null)
      return reply.status(res.status).send(json)
    }
  )
}
