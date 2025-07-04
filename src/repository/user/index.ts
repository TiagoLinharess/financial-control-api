import { knex } from '../../database'
import { CreateUser } from '../../types/user/create-user'
import { randomUUID } from 'crypto'
import { User } from '../../types/user/user'

export class UserRepository {
  async create(user: CreateUser) {
    try {
      await knex('user').insert({
        id: randomUUID(),
        name: user.name,
        family_name: user.familyName,
        email: user.email,
        password: user.password,
      })
    } catch {
      throw new Error()
    }
  }

  async get(email: string): Promise<User | undefined> {
    try {
      const user = await knex('user').where('email', email).first()

      if (!user) return undefined

      return {
        id: user?.id,
        name: user?.name,
        familyName: user?.family_name,
        email: user?.email,
        password: user?.password,
        emailConfirmed: user?.email_confirmed,
        deleteDate: user?.delete_date,
        createdAt: user?.created_at,
      }
    } catch {
      throw new Error()
    }
  }
}
