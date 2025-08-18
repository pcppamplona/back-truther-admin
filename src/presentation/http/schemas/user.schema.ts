import { z } from 'zod'

export const groupLevelSchema = z.enum(['N1', 'N2', 'Produto', 'Admin'])

export const userSchema = z.object({
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

export const getUsersOutputSchema = z.array(userSchema)

export type GetUsersOutputDTO = z.infer<typeof getUsersOutputSchema>
