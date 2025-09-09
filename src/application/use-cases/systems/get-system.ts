import { System } from '@/domain/systems/model/system'
import { SystemsRepository } from '@/domain/systems/repositories/systems-repository'

export class GetSystemUseCase {
  constructor(private systemsRepository: SystemsRepository) {}

  async execute(id: number): Promise<System | null> {
    return this.systemsRepository.findById(id)
  }
}