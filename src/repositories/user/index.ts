import { knex } from '../../database'
import { iCreateUser } from '../../types/user/create-user'
import { randomUUID } from 'crypto'
import { iUser } from '../../types/user/user'
import { iUserRepository } from '../../types/user/user-repository'

export class UserRepository implements iUserRepository {
  async create(user: iCreateUser): Promise<boolean> {
    try {
      await knex('user').insert({
        id: randomUUID(),
        name: user.name,
        family_name: user.familyName,
        email: user.email,
        password: user.password,
      })

      return true
    } catch {
      throw new Error()
    }
  }

  async get(email: string): Promise<iUser | undefined> {
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
