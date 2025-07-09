import type { CreateUser, User } from '@/domain/user/model/user'
import type { UsersRepository } from '@/domain/user/repositories/user-repository'
import { BadRequestError } from '@/errors/bad-request-error'
import { hash } from 'bcrypt'

interface Input extends Omit<CreateUser, 'passwordHash'> {
  password: string
}

interface Output {
  id: number
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    uuid,
    name,
    username,
    password,
    active,
    forceResetPwd,
    typeAuth,
  }: Input): Promise<Output> {
    const passwordHash = await hash(password, 10)

    const existing = await this.usersRepository.findByUsername(username)
    if (existing) throw new BadRequestError('Username already in use.')

    const created = await this.usersRepository.create({
      uuid,
      name,
      username,
      passwordHash,
      active,
      forceResetPwd,
      typeAuth,
    })

    return { id: created.id }
  }
}
