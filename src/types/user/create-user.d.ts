// eslint-disable-next-line
import { knex } from 'knex'
import { z } from 'zod'

declare module 'knex/types/tables' {
  export interface Tables {
    user: {
      id: string
      name: string
      family_name: string
      email: string
      password: string
      email_confirmed: string
      delete_date?: string
      created_at: string
    }
  }
}

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
