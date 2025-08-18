import { UsersRepository } from '@/domain/user/repositories/user-repository'

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    return this.usersRepository.findAll()
  }
}