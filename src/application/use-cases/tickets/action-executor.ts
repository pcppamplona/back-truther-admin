import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import {
  Ticket,
  FinalizeTicketInput,
  ReplyAction,
  TicketData,
} from "@/domain/tickets/model/tickets";
import { FastifyRequest } from "fastify";

export class ActionExecutor {
  constructor(private repo: TicketsRepository) {}

  async execute(
    action: ReplyAction,
    data: FinalizeTicketInput & { audit?: FastifyRequest["audit"] },
    ticket: TicketData
  ) {
    switch (action.action_type_id) {
      case 1:
        await this.handleSendEmail(action, ticket);
        break;

      case 2:
        await this.handleNewTicket(action, data, ticket);
        break;

      default:
        throw new Error(`Ação não reconhecida: ${action.action_type_id}`);
    }
  }

  private async handleSendEmail(action: ReplyAction, ticket: TicketData) {
    if (!action.data_email) {
      throw new Error(`[send_email] Nenhum e-mail definido para a ação ${action.id}`);
    }
  }

  private async handleNewTicket(
    action: ReplyAction,
    data: FinalizeTicketInput & { audit?: FastifyRequest["audit"] },
    ticket: TicketData
  ) {
    if (!action.data_new_ticket_reason_id) {
      throw new Error(`[new_ticket] Nenhum reason_id informado para a ação ${action.id}`);
    }

    const reason = await this.repo.findTicketReasonById(
      action.data_new_ticket_reason_id
    );
    if (!reason) {
      throw new Error(`[new_ticket] Reason ${action.data_new_ticket_reason_id} não encontrado`);
    }

    const newTicket = await this.repo.createTicket({
      created_by: data.user.id,
      client_id: ticket.client.id,
      assigned_group: action.data_new_ticket_assign_to_group ?? null,
      assigned_user: null,
      reason_id: reason.id,
      status: "PENDENTE",
    });

    if (!newTicket) {
      throw new Error(`[new_ticket] Falha ao criar o ticket derivado a partir do ticket ${ticket.id}`);
    }

    if (data.audit) {
      await data.audit({
        action: "crm",
        message: "Sistema criou novo ticket automaticamente",
        description: `Ticket ${newTicket.id} criado automaticamente a partir da finalização do ticket ${ticket.id}`,
        method: "POST",
        senderType: "ADMIN",
        senderId: String(data.user.id),
        targetType: "ADMIN",
        targetId: String(newTicket.id),
        targetExternalId: newTicket.id,
      });
    }

    const commentMessage = `Ticket criado automaticamente a partir da finalização do ticket #${ticket.id}.`;

    const comment = await this.repo.createTicketComment({
      ticket_id: Number(newTicket.id),
      author: "SYSTEM",
      message: commentMessage,
    });

    if (!comment) {
      throw new Error(`[new_ticket] Falha ao criar comentário automático para o ticket ${newTicket.id}`);
    }

    if (data.audit) {
      await data.audit({
        action: "crm",
        message: "Sistema criou comentário automático",
        description: `Ticket ${newTicket.id} criado da finalização do ticket ${ticket.id}`,
        method: "POST",
        senderType: "ADMIN",
        senderId: String(data.user.id),
        targetType: "ADMIN",
        targetId: "1",
        targetExternalId: newTicket.id,
      });
    }
  }
}
