import { z } from 'zod'

export const editUserSchema = z.object({
  name: z.string(),
  familyName: z.string(),
})

export interface iEditUser {
  name?: string
  familyName?: string
}
