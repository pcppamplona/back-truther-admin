import { UserPermissionsRepository } from "@/domain/permissions/repositories/permissions-repository";

export class GetUserPermissionsUseCase {
  constructor(private userPermissionsRepository: UserPermissionsRepository) {}

  async execute(userId: number): Promise<{ id: number; key_name: string; description: string | null }[]> {
    return this.userPermissionsRepository.findDetailsByUserId(userId)
  }
}
