import { compare } from 'bcrypt'

import type { User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'

interface Input {
  username: string
  password: string
}

interface Output {
  user: Omit<User, 'password'>
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ username, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByName(username)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, user.password)
    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return { user }
  }
}
