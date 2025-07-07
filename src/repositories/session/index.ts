import { knex } from '../../database'
import { randomUUID } from 'crypto'
import { iSessionRepository } from '../../types/session/session-repository'
import { iSession } from '../../types/session/session'

export class SessionRepository implements iSessionRepository {
  async create(userID: string): Promise<string> {
    try {
      const id = randomUUID()
      await knex('session').insert({
        id,
        user_id: userID,
      })

      return id
    } catch {
      throw new Error()
    }
  }

  async getAll(userID: string): Promise<iSession[]> {
    try {
      const sessions = await knex('session').where('user_id', userID)

      return sessions.map((session) => ({
        id: session.id,
        userID: session.user_id,
        createdAt: session.created_at,
      }))
    } catch {
      throw new Error()
    }
  }

  async get(sessionID: string): Promise<iSession | undefined> {
    try {
      const session = await knex('session').where('id', sessionID).first()

      if (!session) return undefined

      return {
        id: session.id,
        userID: session.user_id,
        createdAt: session.created_at,
      }
    } catch {
      throw new Error()
    }
  }

  async removeLast(userID: string): Promise<void> {
    try {
      const sessions = await this.getAll(userID)

      if (sessions.length === 0) return

      if (sessions.length <= 3) return

      const oldestSession = sessions.reduce((oldest, session) => {
        return new Date(session.createdAt) < new Date(oldest.createdAt)
          ? session
          : oldest
      }, sessions[0])

      await knex('session').where('id', oldestSession.id).del()
    } catch {
      throw new Error()
    }
  }
}
