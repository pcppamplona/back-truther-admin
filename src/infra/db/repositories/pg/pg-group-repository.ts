import { Group } from "@/domain/user/model/group";
import { GroupsRepository } from "@/domain/user/repositories/groups-repository";
import { PostgresDatabase } from "@/infra/db/pg/connection";

export class PgGroupRepository implements GroupsRepository {
  async getGroupById(id: number): Promise<Group | null> {
    const client = await PostgresDatabase.getClient();
    const res = await client.query<Group>(
      "SELECT * FROM groups WHERE id = $1",
      [id]
    );
    return res.rows[0] || null;
  }

  async getChildrenGroups(groupId: number): Promise<Group[]> {
    const client = await PostgresDatabase.getClient();
    const res = await client.query<Group>(
      "SELECT * FROM groups WHERE parent_id = $1",
      [groupId]
    );
    return res.rows;
  }

async getAllDescendants(groupId: number): Promise<number[]> {
    const result: number[] = [groupId]  // <-- INCLUI O RAIZ
    const queue: number[] = [groupId]
    const client = await PostgresDatabase.getClient()

    while (queue.length > 0) {
      const current = queue.shift()!
      const res = await client.query<Group>("SELECT id FROM groups WHERE parent_id = $1", [current])
      const children = res.rows.map(r => r.id)
      result.push(...children)
      queue.push(...children)
    }

    return result
}

}
