import { UserTransactionsParams } from "@/domain/transactions/model/pix-pagination-params";
import { PgBanksTransactionsRepository } from "@/infra/db/repositories/pg/pg-banks-transactions-repository";

export class ListAllUserTransactionsUseCase {
  constructor(private repo: PgBanksTransactionsRepository) {}

  async execute(document: string, params?: UserTransactionsParams) {
    return this.repo.findAllUserTransactionsByDocument(document, params);
  }
}
