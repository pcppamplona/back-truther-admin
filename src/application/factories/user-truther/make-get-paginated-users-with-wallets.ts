import { PgUserTrutherRepository } from '@/infra/db/repositories/pg/pg-user-truther-repository'
import { GetPaginatedUsersWithWalletsUseCase } from '../../use-cases/user-truther/get-paginated-users-with-wallets'

export function makeGetPaginatedUsersWithWalletsUseCase() {
  const usersTrutherRepository = new PgUserTrutherRepository()
  return new GetPaginatedUsersWithWalletsUseCase(usersTrutherRepository)
}