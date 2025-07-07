import { knex } from '../../database'
import { iCreateUser } from '../../types/user/create-user'
import { randomUUID } from 'crypto'
import { iUser } from '../../types/user/user'
import { iUserRepository } from '../../types/user/user-repository'
import { iEditUser } from '../../types/user/edit-user'

export class UserRepository implements iUserRepository {
  async create(user: iCreateUser): Promise<void> {
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

  async getByEmail(email: string): Promise<iUser | undefined> {
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

  async getById(id: string): Promise<iUser | undefined> {
    try {
      const user = await knex('user').where('id', id).first()

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

  async updateUser(user: iEditUser, id: string): Promise<void> {
    try {
      await knex('user').where('id', id).update({
        name: user.name,
        family_name: user.familyName,
      })
    } catch {
      throw new Error()
    }
  }
}
