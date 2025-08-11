import { z } from 'zod'

export const authenticateInputSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(1, 'Password is required'),
})

export type AuthenticateInputDTO = z.infer<typeof authenticateInputSchema>

export const authenticateOutputSchema = z.object({
  token: z.string(),
})

export type AuthenticateOutputDTO = z.infer<typeof authenticateOutputSchema>
