import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string(),
  familyName: z.string(),
  email: z.string(),
  password: z.string(),
})

export interface iCreateUser {
  name: string
  familyName: string
  email: string
  password: string
}
