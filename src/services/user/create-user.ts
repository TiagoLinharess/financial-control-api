import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { iCreateUser, createUserSchema } from '../../types/user/create-user.d'
import { iUser } from '../../types/user/user'
import { iCreateUserService } from '../../types/user/create-user-service'
import { iUserRepository } from '../../types/user/user-repository'

export class CreateUserService implements iCreateUserService {
  repository: iUserRepository

  constructor(repository: iUserRepository) {
    this.repository = repository
  }

  async perform(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userSchema = createUserSchema.parse(request.body)
      const hashedPassword = await bcrypt.hash(userSchema.password, 10)
      const user: iCreateUser = {
        name: userSchema.name,
        familyName: userSchema.familyName,
        email: userSchema.email,
        password: hashedPassword,
      }

      if (await this.emailExists(user)) {
        return reply.status(400).send({ error: 'email_exists' })
      }

      await this.repository.create(user)
      return reply.status(201).send({ success: true })
    } catch {
      return reply.status(500).send({ error: 'internal_server_error' })
    }
  }

  private async emailExists(userCreateModel: iCreateUser): Promise<boolean> {
    try {
      const user: iUser | undefined = await this.repository.get(
        userCreateModel.email,
      )
      return !!user
    } catch {
      throw new Error()
    }
  }
}
