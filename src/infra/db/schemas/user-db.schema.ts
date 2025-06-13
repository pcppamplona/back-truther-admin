import { z } from 'zod'

export const userDbSchema = z.object({
  id: z.string(),
  name: z.string(),
  password_hash: z.string(),
  created_at: z.date(),
})
