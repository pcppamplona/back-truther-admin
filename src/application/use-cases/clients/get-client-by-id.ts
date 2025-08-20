import { Clients } from "@/domain/clients/model/clients"
import { ClientsRepository } from "@/domain/clients/repositories/clients-repository"

export class GetClientByIdUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute(id: number): Promise<Clients | null> {
    return this.clientsRepository.findById(id)
  }
}
