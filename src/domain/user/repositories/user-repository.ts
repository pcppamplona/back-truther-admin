import type { CreateUser, User } from '../model/user'

export interface UsersRepository {
  findByUsername(username: string): Promise<User | null>
  create(data: CreateUser): Promise<{ id: number }>
}