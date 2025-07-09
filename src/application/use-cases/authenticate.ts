import { compare } from 'bcrypt'
import { z } from 'zod'

import type { User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { BadRequestError } from '@/errors/bad-request-error'
import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { decryptAuthCode } from '@/shared/decrypt'

interface Input {
  encryptedAuthCode: string
}

interface Output {
  user: Omit<User, 'passwordHash'>
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ encryptedAuthCode }: Input): Promise<Output> {
    const decryptedAuthCode = decryptAuthCode(encryptedAuthCode)

    const [userId, password] = this.parseAuthCode(decryptedAuthCode)

    const user = await this.usersRepository.findByUsername(userId)

    if (!user) throw new InvalidCredentialsError()

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) throw new InvalidCredentialsError()

    return {
      user,
    }
  }

  private parseAuthCode(authCode: string): [string, string] {
    const parts = authCode.split('|')

    const schema = z.tuple([z.string().uuid(), z.string().min(1)])

    try {
      const [id, password] = schema.parse(parts)
      return [id, password]
    } catch {
      throw new BadRequestError('Malformed auth code')
    }
  }
}
