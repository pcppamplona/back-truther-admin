import { UsersRepository } from "@/domain/user/repositories/user-repository"

interface GetMeInput {
  userId: number
}

export class GetMeUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetMeInput) {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}
