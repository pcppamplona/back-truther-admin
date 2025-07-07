import { ItemTeste } from '@/domain/user/model/group';
import { ItemTesteRepository } from '@/domain/user/repositories/item-repository';
import { Pool } from 'pg';

export class PgItemTesteRepository implements ItemTesteRepository {
  constructor(private readonly pool: Pool) {}

  async findItemTesteByAccessibleGroups(userId: number): Promise<ItemTeste[]> {
    const result = await this.pool.query<ItemTeste>(
      `
      WITH RECURSIVE accessible_groups AS (
        SELECT g.id
        FROM usuario_grupo ug
        JOIN grupo g ON g.id = ug.id_grupo
        WHERE ug.id_usuario = $1

        UNION ALL

        SELECT g_child.id
        FROM grupo g_child
        JOIN accessible_groups ag ON ag.id = g_child.idUpper
      )
      SELECT i.*
      FROM item_teste i
      WHERE i.idGroup IN (SELECT id FROM accessible_groups)
      `,
      [userId]  
    );

    return result.rows;
  }
}
