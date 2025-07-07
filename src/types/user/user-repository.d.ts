import { iCreateUser } from './create-user'
import { iUser } from './user'

export interface iUserRepository {
  create(user: iCreateUser): Promise<void>
  get(email: string): Promise<iUser | undefined>
}
