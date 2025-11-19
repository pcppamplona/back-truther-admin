import { ListAtmPaginatedUseCase } from "@/application/use-cases/transactions/list-atm-paginated"
import { PgBanksTransactionsRepository } from "@/infra/db/repositories/pg/pg-banks-transactions-repository"

export function makeListAtmPaginatedUseCase() {
    const repo = new PgBanksTransactionsRepository()
    return new ListAtmPaginatedUseCase(repo)
}