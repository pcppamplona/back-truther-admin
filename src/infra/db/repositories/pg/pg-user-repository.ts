import type {
  CreateUser,
  DecisionKycStatus,
  User,
} from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'

import { PostgresDatabase } from "../../pg/connection";

export class PgUserRepository implements UsersRepository {
  async findByName(username: string): Promise<User | null> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `SELECT 
           uuid,
           username,
           password,
           active,
           type_auth AS "typeAuth",
           group_level AS "groupLevel",
           created_at AS "createdAt"
         FROM users
         WHERE username = $1
         LIMIT 1`,
        [username]
      );

      if (result.rowCount === 0) return null

      return result.rows[0]
    } finally {
      client.release()
    }
  }

  async create(user: CreateUser): Promise<{ id: string }> {
    const client = await PostgresDatabase.getClient();

    try {
      const result = await client.query(
        `INSERT INTO users (username, password, active, type_auth, group_level)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING uuid`,
        [
          user.username,
          user.password,
          user.active,
          user.typeAuth,
          user.groupLevel,
        ]
      );

      return { id: result.rows[0].id }
    } finally {
      client.release()
    }
  }

  async updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void> {
    const client = await PostgresDatabase.getClient('truther')

    try {
      await client.query(
        `UPDATE public.users
         SET kyc_approved = $2,
             banking_enable = $3,
             comment_kyc = $4
         WHERE id = $1`,
        [
          decisionKycStatus.id,
          decisionKycStatus.kyc_approved,
          decisionKycStatus.banking_enable,
          decisionKycStatus.comment_kyc ?? null,
        ],
      )
    } finally {
      client.release()
    }
  }
}
