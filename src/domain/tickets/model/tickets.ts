import { TicketReason } from "@/domain/reasons/model/ticket-reasons";

export interface Ticket {
  id?: number;
  created_by: number;
  client_id?: number | null;
  assigned_group: Group | null;
  assigned_user: number | null;
  reason_id: number;
  status: Status;
  created_at?: string;
  finalizate_reply?: number;
  chain_id_main?: number;
  chain_id_last?: number;
}

export type UserTicket = {
  id: number;
  name: string;
  group_level: string;
};

export type ClientTicket = {
  id: number;
  name: string;
  document: string;
  phone: string;
};

export type TypeRecipient = "GROUP" | "USER" | "ALL";
export type Group = "N1" | "N2" | "N3" | "PRODUTO" | "MKT" | "ADMIN";
export type Status =
  | "PENDENTE"
  | "PENDENTE EXPIRADO"
  | "EM ANDAMENTO"
  | "EM ANDAMENTO EXPIRADO"
  | "FINALIZADO"
  | "FINALIZADO EXPIRADO"
  | "AGUARDANDO RESPOSTA DO CLIENTE";


export interface TicketComment {
  id?: number;
  ticket_id: number;
  author: string;
  message: string;
  date?: string;
}

export type FinalizationReply = {
  id: number;
  reason_id: number;
  reply: string;
  comment: boolean;
};

export interface FinalizeTicketInput {
  ticket_id: number;
  reply_id: number;
  comment?: string;
  user: {
    id: number;
    name: string;
    group: string;
  };
}

export interface TicketData {
  id: number;
  created_by: UserTicket;
  client: ClientTicket | null;
  assigned_group: string | null;
  assigned_user: UserTicket | null;
  reason: TicketReason;
  status: Status;
  created_at: string;
  finalizate_reply?: number;
  chain_id_main?: number;
  chain_id_last?: number;
}
