import { CreateAuditLogUseCase } from '../use-cases/audit-logs/create-audit-log'
import { ActionType, SystemType } from '@/domain/audit-logs/model/audit-log'
import { User } from '@/domain/user/model/user'

export interface LogActionParams {
  method: string
  action: ActionType
  message: string
  description?: string
  senderType: SystemType,
  senderId: string,
  targetType: SystemType
  targetId: string
  targetExternalId?: string
}

export class AuditLogService {
  constructor(private createAuditLogUseCase: CreateAuditLogUseCase) {}

  async logAction(params: LogActionParams) {
    const {
      method,
      action,
      message,
      description,
      senderType,
      senderId,
      targetType,
      targetId,
      targetExternalId
    } = params

    return this.createAuditLogUseCase.execute({
      method,
      action,
      message,
      description,
      sender_type: senderType,
      sender_id: senderId,
      target_type: targetType,
      target_id: targetId,
      target_external_id: targetExternalId
    })
  }
}