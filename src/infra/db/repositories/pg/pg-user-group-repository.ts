import { UserGroupsRepository } from "@/domain/user/repositories/user-groups-repository"
import { UserGroup } from "@/domain/user/model/group"
import { PostgresDatabase } from "@/infra/db/pg/connection"

export class PgUserGroupRepository implements UserGroupsRepository {
  async getGroupsByUserId(userId: number): Promise<UserGroup[]> {
    const client = await PostgresDatabase.getClient()
    const res = await client.query<UserGroup>(
      "SELECT * FROM user_groups WHERE user_id = $1",
      [userId]
    )
    return res.rows
  }
}
