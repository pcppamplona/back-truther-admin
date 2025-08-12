import type { CreateUser, DecisionKycStatus, User } from '../model/user'

export interface UsersRepository {
  findByName(name: string): Promise<User | null>
  create(data: CreateUser): Promise<{ id: string }>
  updateKycStatus(decisionKycStatus: DecisionKycStatus): Promise<void>
}
