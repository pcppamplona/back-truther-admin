import { PaginableRepository, PaginatedResult, PaginationParams } from "@/shared/pagination";

// aplicacao da tentativa de paginations generico
export class ListPaginatedUseCase<T> {
  constructor(private repo: PaginableRepository<T>) {}

  async execute(params: PaginationParams): Promise<PaginatedResult<T>> {
    return this.repo.findPaginated(params)
  }
}
