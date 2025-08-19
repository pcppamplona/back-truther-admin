import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { GetMeUseCase } from "../../use-cases/users/get-me-use-case"

export function makeGetMeUseCase() {
  console.log("makeGetMeUseCase 1")
  const usersRepository = new PgUserRepository()

  console.log("usersRepository:", usersRepository)
  return new GetMeUseCase(usersRepository)
}
