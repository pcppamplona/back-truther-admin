import { z } from 'zod'

export const authenticateInputSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export type AuthenticateInputDTO = z.infer<typeof authenticateInputSchema>

export const authenticateOutputSchema = z.object({
  token: z.string(),
  permissions: z.array(
    z.object({
      key_name: z.string(),
      description: z.string().nullable(),
    })
  ),
})

export type AuthenticateOutputDTO = z.infer<typeof authenticateOutputSchema>
