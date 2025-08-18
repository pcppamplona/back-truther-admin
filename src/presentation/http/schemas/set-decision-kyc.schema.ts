import { z } from 'zod'

export const setKycDecisionInputSchema = z.object({
  id: z.number(),
  decision: z.boolean(),
  internalComment: z.string(),
  externalComment: z.string().optional(),
})

export type SetKycDecisionInputDTO = z.infer<typeof setKycDecisionInputSchema>

export const setKycDecisionOutputSchema = z.object({
  id: z.string(),
})

export type SetKycDecisionOutputDTO = z.infer<typeof setKycDecisionOutputSchema>
