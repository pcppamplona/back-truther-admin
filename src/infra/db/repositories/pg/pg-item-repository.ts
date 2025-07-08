import { ItemsRepository } from "@/domain/user/repositories/item-repository";
import { PostgresDatabase } from "../../pg/connection";
import { Item } from "@/domain/user/model/item";

export class PgItemsRepository implements ItemsRepository {
  async findByGroupIds(groupIds: number[]): Promise<Item[]> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT id, group_id AS "groupId", title, description
                 FROM items
                 WHERE group_id = ANY($1::int[])`,
        [groupIds]
      );

      return result.rows;
    } finally {
      client.release();
    }
  }
}
