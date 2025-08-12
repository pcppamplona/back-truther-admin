import type { Clients } from '@/domain/clients/model/clients'
import type { ClientsRepository } from '@/domain/clients/repositories/clients-repository'

export class GetClientByUuidUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(uuid: string): Promise<Clients | null> {
    return this.clientsRepository.findByUuid(uuid)
  }
}
