import { z } from "zod";

export const listClientsPaginatedQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});

export const getClientByIdParamsSchema = z.object({
  id: z.coerce.number(),
})
export type GetClientByIdParamsSchema = z.infer<
  typeof getClientByIdParamsSchema
>;
