import { compare } from 'bcrypt'

import type { User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

interface Input {
  name: string
  password: string
}

interface Output {
  user: Omit<User, 'passwordHash'>
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByName(name)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, user.passwordHash)
    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return { user }
  }
}
