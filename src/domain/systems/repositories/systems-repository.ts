import { System } from '../model/system'

export interface CreateSystemData {
  name: string
  description: string
}

export interface SystemsRepository {
  create(data: CreateSystemData): Promise<System>
  findAll(): Promise<System[]>
  findById(id: number): Promise<System | null>
}