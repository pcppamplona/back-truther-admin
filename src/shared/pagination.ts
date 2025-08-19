export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface PaginableRepository<T> {
  findPaginated(params: PaginationParams): Promise<PaginatedResult<T>>
}
