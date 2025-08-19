import { PaginableRepository } from "@/shared/pagination"
import { ListPaginatedUseCase } from "../list-paginated"
import type { Clients } from "@/domain/clients/model/clients"

export class ListClientsPaginatedUseCase extends ListPaginatedUseCase<Clients> {
  constructor(repo: PaginableRepository<Clients>) {
    super(repo)
  }
}