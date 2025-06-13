import { hash } from 'bcrypt'

import type { CreateUser, User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { BadRequestError } from '@/errors/bad-request-error'

interface Input extends Omit<CreateUser, 'passwordHash'> {
  password: string
}

interface Output extends Pick<User, 'id'> {}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, password }: Input): Promise<Output> {
    const passwordHash = await hash(password, 6)

    const userWithSameName = await this.usersRepository.findByName(name)

    if (userWithSameName) {
      throw new BadRequestError('User already exists.')
    }

    const user = await this.usersRepository.create({
      name,
      passwordHash,
    })

    return { id: user.id }
  }
}
