import { UserGroupsRepository } from "@/domain/user/repositories/user-group-repository";
import { PostgresDatabase } from "../../pg/connection";

export class PgUserGroupsRepository implements UserGroupsRepository {
    addUserToGroup(userId: number, groupId: number, isMain?: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findGroupIdsByUserId(userId: number): Promise<number[]> {
        const client = await PostgresDatabase.getClient();

        try {
            const result = await client.query(
                `SELECT group_id FROM user_groups WHERE user_id = $1`,
                [userId]
            );

            return result.rows.map(row => row.group_id);
        } finally {
            client.release();
        }
    }
}
