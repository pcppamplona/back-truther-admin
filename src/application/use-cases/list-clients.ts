import type { Clients } from '@/domain/clients/model/clients'
import type { ClientsRepository } from '@/domain/clients/repositories/clients-repository'

export class ListClientsUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(): Promise<Clients[]> {
    return this.clientsRepository.findAll()
  }
}
