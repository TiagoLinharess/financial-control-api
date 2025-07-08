import { z } from 'zod'

export const editEmailSchema = z.object({
  email: z.string(),
  password: z.string(),
  newEmail: z.string(),
})

export interface iEditEmail {
  email: string
  password: string
  newEmail: string
}
