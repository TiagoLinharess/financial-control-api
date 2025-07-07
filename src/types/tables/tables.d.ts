// eslint-disable-next-line
import { knex } from 'knex'

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
