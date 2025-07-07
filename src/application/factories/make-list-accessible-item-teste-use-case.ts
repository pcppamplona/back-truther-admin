import { PgItemTesteRepository } from '@/infra/db/repositories/pg/pg-item-repository';
import { ListAccessibleItemTesteUseCase } from '../use-cases/item-teste/list-accessible-item-teste-use-case';

import { PostgresDatabase } from '@/infra/db/pg/connection';

export function makeListAccessibleItemTesteUseCase() {
  const pool = PostgresDatabase.getPool();
  const itemTesteRepository = new PgItemTesteRepository(pool);
  return new ListAccessibleItemTesteUseCase(itemTesteRepository);
}
