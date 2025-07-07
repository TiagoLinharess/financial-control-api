import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export interface iLogin {
  email: string
  password: string
}
