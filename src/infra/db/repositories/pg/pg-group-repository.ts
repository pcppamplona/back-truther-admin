import { Group } from "@/domain/user/model/group";
import { GroupsRepository } from "@/domain/user/repositories/groups-repository";
import { PostgresDatabase } from "@/infra/db/pg/connection";

export class PgGroupRepository implements GroupsRepository {
  async getGroupById(id: number): Promise<Group | null> {
    const client = await PostgresDatabase.getClient();
    console.log("getGroupById");

    try {
      const res = await client.query<Group>(
        "SELECT * FROM groups WHERE id = $1",
        [id]
      );

      console.log("response getGroupById>>", res.rows[0]);

      return res.rows[0] || null;
    } catch (error) {
      console.log(">>Error>>", error);
      throw Error;
    } finally {
      client.release();
    }
  }

  async getChildrenGroups(groupId: number): Promise<Group[]> {
    const client = await PostgresDatabase.getClient();
    console.log("getChildrenGroups");
    try {
      const res = await client.query<Group>(
        "SELECT * FROM groups WHERE parent_id = $1",
        [groupId]
      );
      console.log("response getChildrenGroups>>", res.rows);
      return res.rows;
    } catch (error) {
      console.log(">>Error>>", error);
      throw Error;
    } finally {
      client.release();
    }
  }

  async getAllDescendants(groupId: number): Promise<number[]> {
    const result: number[] = [groupId]; // <-- INCLUI O RAIZ
    const queue: number[] = [groupId];
    const client = await PostgresDatabase.getClient();
    console.log("getAllDescendants");

    try {
      while (queue.length > 0) {
        const current = queue.shift()!;
        const res = await client.query<Group>(
          "SELECT id FROM groups WHERE parent_id = $1",
          [current]
        );
        const children = res.rows.map((r) => r.id);
        result.push(...children);
        queue.push(...children);
      }

      console.log("response getAllDescendants>>", result);

      return result;
    } catch (error) {
      console.log(">>Error>>", error);
      throw Error;
    } finally {
      client.release();
    }
  }
}
