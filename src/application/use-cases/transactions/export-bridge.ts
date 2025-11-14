import { BanksTransactionsRepository } from '@/domain/transactions/repositories/banks-transactions-repository'
import { BridgeParams } from '@/domain/transactions/model/pix-pagination-params'
import { BridgeTransaction } from '@/domain/transactions/model/bridge-transaction'

export class ExportBridgeUseCase {
  constructor(private repo: BanksTransactionsRepository) {}

  async execute(params: Omit<BridgeParams, 'page' | 'limit'>): Promise<BridgeTransaction[]> {
    return this.repo.findBridgeAll(params)
  }
}
