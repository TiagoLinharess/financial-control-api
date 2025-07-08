import { iCreateUser } from './create-user'
import { iEditEmail } from './edit-email'
import { iEditUser } from './edit-user'
import { iUser } from './user'

export interface iUserRepository {
  create(user: iCreateUser): Promise<void>
  getByEmail(email: string): Promise<iUser | undefined>
  getById(id: string): Promise<iUser | undefined>
  updateUser(user: iEditUser, id: string): Promise<void>
  updateEmail(data: iEditEmail, id: string): Promise<void>
}
