import { z } from "zod";

export const finalizeTicketParamsSchema = z.object({
  id: z.coerce.number(),
});

export const finalizeTicketBodySchema = z.object({
  reply_id: z.number(),
  comment_text: z.string().optional(),
  force_assign: z.boolean().optional(),
});
