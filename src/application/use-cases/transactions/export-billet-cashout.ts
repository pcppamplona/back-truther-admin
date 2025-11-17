import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { BilletCashoutParams } from '@/domain/transactions/model/pix-pagination-params'
import { BilletCashoutTransaction } from '@/domain/transactions/model/billet-cashout-transaction'

export class ExportBilletCashoutUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: Omit<BilletCashoutParams, 'page' | 'limit'>): Promise<BilletCashoutTransaction[]> {
    return this.repo.findBilletCashoutAll(params)
  }
}
