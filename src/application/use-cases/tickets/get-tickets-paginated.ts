import { PaginableRepository } from "@/shared/pagination"
import { ListPaginatedUseCase } from "../list-paginated"
import { Ticket } from "@/domain/tickets/model/tickets"

export class GetTicketsPaginatedUseCase extends ListPaginatedUseCase<Ticket> {
  constructor(repo: PaginableRepository<Ticket>) {
    super(repo)
  }
}