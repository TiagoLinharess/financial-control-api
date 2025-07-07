import { iSession } from './session'

export interface iSessionRepository {
  create(userID: string): Promise<string>
  getAll(userID: string): Promise<iSession[]>
  get(sessionID: string): Promise<iSession | undefined>
  removeLast(userID: string): Promise<void>
}
