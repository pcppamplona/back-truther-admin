import { PgGroupRepository } from "@/infra/db/repositories/pg/pg-group-repository"

import { GetUserVisibleGroupIdsUseCase } from "../use-cases/get-user-visible-items"
import { PgUserGroupRepository } from "@/infra/db/repositories/pg/pg-user-group-repository"

export function makeGetUserVisibleGroupIdsUseCase() {
  const groupsRepository = new PgGroupRepository()
  const userGroupsRepository = new PgUserGroupRepository()

  return new GetUserVisibleGroupIdsUseCase(userGroupsRepository, groupsRepository)
}
