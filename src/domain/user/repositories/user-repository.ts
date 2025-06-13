import type { CreateUser, User } from '../model/user'

export interface UsersRepository {
  findByName(name: string): Promise<User | null>
  create(data: CreateUser): Promise<{ id: string }>
}
