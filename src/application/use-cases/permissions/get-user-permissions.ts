import { UserPermissionsRepository } from "@/domain/permissions/repositories/permissions-repository";

export class GetUserPermissionsUseCase {
  constructor(private userPermissionsRepository: UserPermissionsRepository) {}

  async execute(userId: number): Promise<string[]> {
    return this.userPermissionsRepository.findByUserId(userId)
  }
}
