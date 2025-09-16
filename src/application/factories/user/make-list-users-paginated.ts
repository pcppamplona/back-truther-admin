import { ListUsersPaginatedUseCase } from "@/application/use-cases/users/list-users-paginated-use-case"
import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"

export function makeListUsersPaginatedUseCase() {
  const repo = new PgUserRepository()
  return new ListUsersPaginatedUseCase(repo)
}
