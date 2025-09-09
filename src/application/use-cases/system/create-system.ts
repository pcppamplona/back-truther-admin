import { System } from '@/domain/system/model/system'
import { CreateSystemData, SystemRepository } from '@/domain/system/repositories/system-repository'

export class CreateSystemUseCase {
  constructor(private systemRepository: SystemRepository) {}

  async execute(data: CreateSystemData): Promise<System> {
    return this.systemRepository.create(data)
  }
}