
import { PgUserRepository } from "@/infra/db/repositories/pg/pg-user-repository"
import { GetAllUsersUseCase } from "../use-cases/users/get-all-users-use-case"

export function makeGetAllUsersUseCase() {
  const usersRepository = new PgUserRepository()
  return new GetAllUsersUseCase(usersRepository)
}
