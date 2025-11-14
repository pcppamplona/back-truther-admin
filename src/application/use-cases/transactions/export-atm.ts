import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { AtmParams } from '@/domain/transactions/model/pix-pagination-params'
import { AtmTransaction } from '@/domain/transactions/model/atm-transaction'

export class ExportAtmUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: Omit<AtmParams, 'page' | 'limit'>): Promise<AtmTransaction[]> {
    return this.repo.findAtmAll(params)
  }
}
