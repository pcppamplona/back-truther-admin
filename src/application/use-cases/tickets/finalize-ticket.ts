import { FinalizeTicketInput, Ticket } from "@/domain/tickets/model/tickets";
import { TicketsRepository } from "@/domain/tickets/repositories/tickets-repository";
import { ActionExecutor } from "./action-executor";
import { FastifyRequest } from "fastify";

export class FinalizeTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute(
    data: FinalizeTicketInput,
    req?: FastifyRequest
  ): Promise<Ticket> {
    const updatedTicket = await (this.ticketsRepository as any).withTransaction(
      async (txRepo: TicketsRepository) => {
        const ticket = await txRepo.findById(data.ticket_id);
        if (!ticket) {
          throw new Error("Ticket não encontrado");
        }

        if (ticket.assigned_user?.id !== data.user.id) {
          throw new Error("Usuário não correspondente.");
        }
        if (!ticket.assigned_user) {
          throw new Error("Ticket está sem usuário atribuído.");
        }

        if (data.comment) {
          await txRepo.createTicketComment({
            ticket_id: data.ticket_id,
            author: data.user.name,
            message: data.comment,
          });
        }

        const replyActions = await txRepo.findReplyReasonsActionsByReplyId(
          data.reply_id
        );

        if (replyActions && replyActions.length > 0) {
        const executor = new ActionExecutor(txRepo);
        for (const action of replyActions) {
          await executor.execute(
            action,
            { ...data, audit: req?.audit },
            ticket
          );
        }
      }
        // const executor = new ActionExecutor(txRepo);
        // for (const action of replyActions) {
        //   await executor.execute(
        //     action,
        //     { ...data, audit: req?.audit },
        //     ticket
        //   );
        // }

        const updated = await txRepo.updateTicket(data.ticket_id, {
          status: "FINALIZADO",
          assigned_user: data.user.id,
          finalizate_reply: data.reply_id,
        });

        return updated;
      }
    );

    try {
      if (req) {
        await req.audit?.({
          action: "crm",
          message: "Ticket finalizado",
          description: `Ticket ${data.ticket_id} finalizado por ${data.user.name}`,
          method: "PATCH",
          senderType: "USER",
          senderId: String(data.user.id),
          targetType: "ADMIN",
          targetId: "1",
          targetExternalId: data.ticket_id,
        });

        if (data.comment) {
          await req.audit?.({
            action: "crm",
            message: "User create finalizate ticket comment",
            description: `Comentário de finalização adicionado ao ticket ${data.ticket_id}`,
            method: "POST",
            senderType: "USER",
            senderId: String(data.user.id),
            targetType: "ADMIN",
            targetId: "1",
            targetExternalId: data.ticket_id,
          });
        }
      }
    } catch (e) {
      console.error("Falha ao auditar:", e);
    }

    return updatedTicket;
  }
}
