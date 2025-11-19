import { Aclwallets } from "@/domain/wallets/model/acl-wallets";
import { WalletsRepository } from "@/domain/wallets/repositories/wallets-repository";

export class GetWalletsByClientDocumentUseCase {
    constructor(private walletsRepository: WalletsRepository){}

    async execute(document: string): Promise<Aclwallets[]> {
        return this.walletsRepository.findByClientDocument(document)
    }
}