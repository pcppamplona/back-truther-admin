import { z } from 'zod'

export const getMeOutputSchema = z.object({
  id: z.number(),
  uuid: z.string().uuid(),
  name: z.string(),
  username: z.string().email(),
  password: z.string(),
  active: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  forceResetPwd: z.boolean(),
  typeAuth: z.string(),
  groupLevel: z.string(),
})

export type GetMeOutputDTO = z.infer<typeof getMeOutputSchema>
