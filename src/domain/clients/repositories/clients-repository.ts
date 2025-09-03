import { Clients } from '../model/clients'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export interface ClientsRepository {
  findAll(): Promise<Clients[]>
  findByUuid(uuid: string): Promise<Clients | null>
  findById(id: number): Promise<Clients | null>
  findPaginated(params: PaginationParams): Promise<PaginatedResult<Clients>>
}
