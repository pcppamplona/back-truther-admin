import { ListUsersPaginatedUseCase } from "@/application/use-cases/users/list-users-paginated-use-case"
import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { PoolClient } from "pg"

export function makeListUsersPaginatedUseCase(client?: PoolClient) {
  const repo = new PgUserRepository(client)
  return new ListUsersPaginatedUseCase(repo)
}
