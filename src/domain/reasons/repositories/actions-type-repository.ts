import { ActionsType } from "@/domain/reasons/model/ticket-reasons";

export interface ActionsTypeRepository {
  create(type: string): Promise<ActionsType>;
  findAll(): Promise<ActionsType[]>;
  delete(id: number): Promise<void>;
}
