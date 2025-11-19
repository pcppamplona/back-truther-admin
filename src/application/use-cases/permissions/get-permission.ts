import { PgPermissionsRepository } from "@/infra/db/repositories/pg/pg-permissions-repository";

interface Permission {
  id: string;
  key_name: string;
  description: string;
}

export class GetPermissionsUseCase {
  constructor(
    private readonly permissionsRepository: PgPermissionsRepository,
  ) {}

  async execute(): Promise<Permission[]> {
    return this.permissionsRepository.findAll();
  }
}
