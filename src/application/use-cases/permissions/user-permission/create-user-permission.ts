import { UserPermissionsRepository } from "@/domain/permissions/repositories/permissions-repository"

interface Input {
  user_id: number
  permission_id: number
}

export class CreateUserPermissionUseCase {
  constructor(private userPermissionsRepository: UserPermissionsRepository) {}

  async execute({ user_id, permission_id }: Input): Promise<void> {
    await this.userPermissionsRepository.create({ user_id, permission_id })
  }
}
