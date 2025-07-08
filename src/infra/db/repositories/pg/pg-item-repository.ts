import { Item } from "@/domain/user/model/item"
import { PostgresDatabase } from "@/infra/db/pg/connection"

export class PgItemRepository {
  async findItemsByGroupIds(groupIds: number[]): Promise<Item[]> {
    const client = await PostgresDatabase.getClient()
    const res = await client.query<Item>(
      `
      SELECT DISTINCT i.id, i.name
      FROM items i
      JOIN item_groups ig ON ig.item_id = i.id
      WHERE ig.group_id = ANY($1)
      `,
      [groupIds]
    )
    return res.rows
  }
}
