import { BilletCashoutTransaction } from "@/domain/transactions/model/billet-cashout-transaction";
import { BilletCashoutParams } from "@/domain/transactions/model/pix-pagination-params";
import { BanksTransactionsRepository } from "@/domain/transactions/repositories/banks-transactions-repository";
import { PaginatedResult } from "@/shared/pagination";

export class ListBilletCashoutPaginatedUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: BilletCashoutParams): Promise<PaginatedResult<BilletCashoutTransaction>> {
    return this.repo.findBilletCashoutPaginated(params)
  }
}
