import { BridgeTransaction } from "@/domain/transactions/model/bridge-transaction";
import { BridgeParams } from "@/domain/transactions/model/pix-pagination-params";
import { BanksTransactionsRepository } from "@/domain/transactions/repositories/banks-transactions-repository";
import { PaginatedResult } from "@/shared/pagination";

export class ListBridgePaginatedUseCase {
    constructor(private repo: BanksTransactionsRepository) {}

    async execute(params: BridgeParams): Promise<PaginatedResult<BridgeTransaction>> {
        return this.repo.findBridgePaginated(params)
    }
}