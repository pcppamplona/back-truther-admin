import { WalletsRepository } from "@/domain/wallets/repositories/wallets-repository";
import { PoolClient } from "pg";
import { PostgresDatabase } from "../../pg/connection";
import { Aclwallets } from "@/domain/wallets/model/acl-wallets";

export class PgWalletsRepository implements WalletsRepository {

  private async getClientBanks(): Promise<PoolClient> {
    return PostgresDatabase.getClient("banks");
  }

  async findByClientDocument(document: string): Promise<Aclwallets[]> {
    const client = await this.getClientBanks();

    try {
      const result = await client.query(
        `
            SELECT 
            *
            FROM public."aclWallets" w
            WHERE w."document" = $1;
            `,
        [document]
      );

      return result.rows[0] ?? null;
    } finally {
      client.release();
    }
  }
}
