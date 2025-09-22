import { z } from "zod";

export const finalizeTicketParamsSchema = z.object({
  id: z.coerce.number(), // garante que venha como número
});

export const finalizeTicketBodySchema = z.object({
  replyId: z.number(),
  commentText: z.string().optional(),
  forceAssign: z.boolean().optional(),
});
