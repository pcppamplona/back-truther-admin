import type { User } from '../model/user'

export interface UsersRepository {
  findByName(name: string): Promise<User | null>
  findAll(): Promise<User[]>
  findById(id: number): Promise<User | null>
}
