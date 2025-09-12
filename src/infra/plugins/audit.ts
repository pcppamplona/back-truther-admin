import fp from 'fastify-plugin'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import { makeAuditLogService } from '@/application/factories/audit-logs/make-audit-log-service'
import type { LogActionParams } from '@/application/services/audit-log-service'

declare module 'fastify' {
  interface FastifyRequest {
    audit: (
      partial: Omit<LogActionParams, 'method'> &
        Partial<Pick<LogActionParams, 'method'>>
    ) => Promise<void>
  }
}

async function auditPlugin(fastify: FastifyInstance) {
  const auditService = makeAuditLogService()

  fastify.decorateRequest(
    'audit',
    async function (
      this: FastifyRequest,
      partial: Omit<LogActionParams, 'method'> &
        Partial<Pick<LogActionParams, 'method'>>
    ) {
      try {
        await auditService.logAction({
          method: partial.method ?? this.method,
          action: partial.action,
          message: partial.message,
          description: partial.description,
          senderType: partial.senderType,
          senderId: partial.senderId,
          targetType: partial.targetType,
          targetId: partial.targetId ?? '',
        })
      } catch (err) {
        this.log?.warn({ err }, 'audit_log_failed')
      }
    }
  )
}

export default fp(auditPlugin, { name: 'audit-plugin' })