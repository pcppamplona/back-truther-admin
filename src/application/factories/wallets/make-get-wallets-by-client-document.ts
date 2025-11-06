import { GetWalletsByClientDocumentUseCase } from "@/application/use-cases/wallets/get-wallets-by-client-document";
import { PgWalletsRepository } from "@/infra/db/repositories/pg/pg-wallets-repository";
import { PoolClient } from "pg";

export function makeGetWalletsByClientDocumentUseCase () {
    const repo = new PgWalletsRepository()
    return new GetWalletsByClientDocumentUseCase(repo)
}