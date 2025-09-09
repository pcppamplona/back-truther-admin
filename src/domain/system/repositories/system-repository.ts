import { System } from '../model/system'
import { PaginatedResult, PaginationParams } from '@/shared/pagination'

export interface CreateSystemData {
  name: string
  description: string
}

export interface UpdateSystemData {
  name?: string
  description?: string
}

export interface SystemRepository {
  create(data: CreateSystemData): Promise<System>
  findAll(): Promise<System[]>
  findById(id: number): Promise<System | null>
  update(id: number, data: UpdateSystemData): Promise<System | null>
  delete(id: number): Promise<void>
  findPaginated(params: PaginationParams): Promise<PaginatedResult<System>>
}