import { z } from "zod";

export const updateTicketParamsSchema = z.object({
  id: z.coerce.number(),
});

export const updateTicketBodySchema = z.object({
  status: z
    .enum([
      "PENDENTE",
      "PENDENTE EXPIRADO",
      "EM ANDAMENTO",
      "EM ANDAMENTO EXPIRADO",
      "FINALIZADO",
      "FINALIZADO EXPIRADO",
      "AGUARDANDO RESPOSTA DO CLIENTE",
    ])
    .optional(),
  reason: z.any().optional(),
  assignedTo: z.any().optional(),
  client: z.any().optional(),
});

export type UpdateTicketParams = z.infer<typeof updateTicketParamsSchema>;
export type UpdateTicketBody = z.infer<typeof updateTicketBodySchema>;
