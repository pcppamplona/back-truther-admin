
import { GetUserItemsUseCase } from '../../use-cases/users/get-user-items';
import { PgGroupsRepository } from '@/infra/db/repositories/pg/pg-groups-repository';
import { PgItemsRepository } from '@/infra/db/repositories/pg/pg-item-repository';
import { PgUserGroupsRepository } from '@/infra/db/repositories/pg/pg-user-group-repository';

export function makeGetUserItemsUseCase() {
    const itemsRepository = new PgItemsRepository();
    const groupsRepository = new PgGroupsRepository();
    const userGroupsRepository = new PgUserGroupsRepository();

    return new GetUserItemsUseCase(userGroupsRepository, groupsRepository, itemsRepository);
}
