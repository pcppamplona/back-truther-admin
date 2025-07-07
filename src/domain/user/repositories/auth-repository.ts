import { Authentication } from '../model/authentication'

export interface AuthRepository {
  create(data: Authentication): Promise<void>
  findAll(): Promise<Authentication[]>
  findByUsername(username: string): Promise<Authentication | null>
}
