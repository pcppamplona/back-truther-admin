import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { GetMeUseCase } from "../../use-cases/users/get-me-use-case"
import { PoolClient } from "pg"

export function makeGetMeUseCase(client?: PoolClient) {
  const usersRepository = new PgUserRepository(client)
  return new GetMeUseCase(usersRepository)
}
