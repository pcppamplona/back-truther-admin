import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { GetMeUseCase } from "../../use-cases/users/get-me-use-case"

export function makeGetMeUseCase() {
  const usersRepository = new PgUserRepository()
  return new GetMeUseCase(usersRepository)
}
