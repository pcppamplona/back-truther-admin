import { PaginableRepository } from "@/shared/pagination"
import { ListPaginatedUseCase } from "../list-paginated"
import { User } from "@/domain/user/model/user"

export class ListUsersPaginatedUseCase extends ListPaginatedUseCase<User> {
  constructor(repo: PaginableRepository<User>) {
    super(repo)
  }
}
