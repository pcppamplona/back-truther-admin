import { Clients } from '../model/clients'

export interface ClientsRepository {
  findAll(): Promise<Clients[]>
  findByUuid(uuid: string): Promise<Clients | null>
}
