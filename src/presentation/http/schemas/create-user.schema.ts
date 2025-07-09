import { z } from "zod";

export const createUserInputSchema = z.object({
  uuid: z.string().uuid(),
  name: z
  .string()
  .min(4, "O nome deve ter pelo menos 4 caracteres.")
  .max(20, "O nome deve ter no máximo 20 caracteres."),
  username: z
  .string()
  .min(4, "O nome usuário deve ter pelo menos 4 caracteres.")
  .max(20, "O nome usuário deve ter no máximo 20 caracteres."),
  password: z
  .string()
  .min(6, "A senha deve ter pelo menos 6 caracteres.")
  .max(12, "A senha deve ter no máximo 12 caracteres."),
  active: z.boolean().optional(),
  forceResetPwd: z.boolean().optional(),
  typeAuth: z.string().optional()
});

export type CreateUserInputDTO = z.infer<typeof createUserInputSchema>;

export const createUserOutputSchema = z.object({
  id: z.string(),
});

export type CreateUserOutputDTO = z.infer<typeof createUserOutputSchema>;
