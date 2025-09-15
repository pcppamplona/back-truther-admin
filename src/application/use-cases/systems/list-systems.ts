import { System } from '@/domain/systems/model/system'
import { SystemsRepository } from '@/domain/systems/repositories/systems-repository'

export class ListSystemsUseCase {
  constructor(private systemsRepository: SystemsRepository) {}

  async execute(): Promise<System[]> {
    return this.systemsRepository.findAll()
  }
}