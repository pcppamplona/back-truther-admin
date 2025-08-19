import { z } from "zod"

export const listClientsPaginatedQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
})
