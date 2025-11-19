import { AtmTransaction } from "@/domain/transactions/model/atm-transaction";
import { AtmParams } from "@/domain/transactions/model/pix-pagination-params";
import { BanksTransactionsRepository } from "@/domain/transactions/repositories/banks-transactions-repository";
import { PaginatedResult } from "@/shared/pagination";

export class ListAtmPaginatedUseCase {
    constructor(private repo: BanksTransactionsRepository) {}

    async execute(params: AtmParams): Promise<PaginatedResult<AtmTransaction>> {
        return this.repo.findAtmPaginated(params)
    }
}
