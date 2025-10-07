import { z } from "zod";

export const PaginatedQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["ASC", "DESC"]).optional(),
})
export const IdParamsSchema = z.object({
  id: z.coerce.number(),
})
export type GetClientByIdParamsSchema = z.infer<
  typeof IdParamsSchema
>;
