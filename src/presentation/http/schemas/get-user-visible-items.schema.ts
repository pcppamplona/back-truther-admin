import { z } from 'zod'

export const getUserVisibleItemsInputSchema = z.object({
  userId: z.coerce.number().int().positive(),
})

export const getUserVisibleItemsOutputSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    }),
  ),
})
