import { z } from 'zod'

export const authenticateInputSchema = z.object({
  encryptedAuthCode: z.string(),
})

export type AuthenticateInputDTO = z.infer<typeof authenticateInputSchema>

export const authenticateOutputSchema = z.object({
  token: z.string(),
})

export type AuthenticateOutputDTO = z.infer<typeof authenticateOutputSchema>
