import { FastifyRequest, FastifyReply } from 'fastify'
import { makePermissionService } from '@/application/factories/permissions/make-permission-service'

export function checkPermission(required: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = Number(req.user?.sub)
    if (!userId) return reply.status(401).send({ message: 'Unauthorized' })

    const permissionService = makePermissionService()
    const has = await permissionService.hasPermission(userId, required)

    if (!has) {
      return reply.status(403).send({
        message: 'Forbidden: You do not have permission to access this resource',
        code: 'PERMISSION_DENIED',
        requiredPermission: required,
        userId
      })
    }
  }
}
