
import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { GetAllUsersUseCase } from "../../use-cases/users/get-all-users-use-case"
import { PoolClient } from "pg"

export function makeGetAllUsersUseCase(client?: PoolClient) {
  const usersRepository = new PgUserRepository(client)
  return new GetAllUsersUseCase(usersRepository)
}
