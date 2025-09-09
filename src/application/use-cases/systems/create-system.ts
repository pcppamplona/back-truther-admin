import { System } from '@/domain/systems/model/system'
import { CreateSystemData, SystemsRepository } from '@/domain/systems/repositories/systems-repository'

export class CreateSystemUseCase {
  constructor(private systemsRepository: SystemsRepository) {}

  async execute(data: CreateSystemData): Promise<System> {
    return this.systemsRepository.create(data)
  }
}