import { PgUserTrutherRepository } from '@/infra/db/repositories/pg/pg-user-truther-repository'
import { GetUsersTrutherWithWalletsUseCase } from '../../use-cases/user-truther/get-paginated-users-with-wallets'

export function makeGetUsersTrutherWithWalletsUseCase() {
  const usersTrutherRepository = new PgUserTrutherRepository()
  return new GetUsersTrutherWithWalletsUseCase(usersTrutherRepository)
}