import { ListBridgePaginatedUseCase } from "@/application/use-cases/transactions/list-bridge-paginated";
import { PgBanksTransactionsRepository } from "@/infra/db/repositories/pg/pg-banks-transactions-repository";

export function makeListBridgePaginatedUseCase() {
    const repo = new PgBanksTransactionsRepository()
    return new ListBridgePaginatedUseCase(repo)
}