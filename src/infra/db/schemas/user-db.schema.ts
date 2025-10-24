import { z } from 'zod'

export const userDbSchema = z.object({
  id: z.number(),               
  uuid: z.string().uuid(),
  username: z.string(),
  password: z.string(),         
  active: z.boolean(),
  type_auth: z.string(),    
  role_id: z.number(),
  created_at: z.date(),
})