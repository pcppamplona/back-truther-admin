import type { User } from '../model/user'

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface UsersRepository {
  findByName(name: string): Promise<User | null>
  findAll(): Promise<User[]>
  findAllPaginated(params: PaginationParams): Promise<PaginatedResult<User>>
  findById(id: number): Promise<User | null>
}
