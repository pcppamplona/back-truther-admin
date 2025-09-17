import { PaginationParams } from '@/shared/pagination'

export interface AuditLogPaginationParams extends PaginationParams {
  action?: string
  method?: string
  sender_id?: string
  sender_type?: string
  target_id?: string
  target_type?: string
  target_external_id?: string
  created_after?: string
  created_before?: string
}