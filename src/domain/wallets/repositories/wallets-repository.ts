import { Aclwallets } from "../model/acl-wallets";

export interface WalletsRepository {
    findByClientDocument(document: string): Promise<Aclwallets[]>
}