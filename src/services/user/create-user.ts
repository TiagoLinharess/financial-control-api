import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { iCreateUser, createUserSchema } from '../../types/user/create-user.d'
import { iCreateUserService } from '../../types/user/create-user-service'
import { iUserRepository } from '../../types/user/user-repository'

export class CreateUserService implements iCreateUserService {
  repository: iUserRepository

  constructor(repository: iUserRepository) {
    this.repository = repository
  }

  async perform(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const userSchema = createUserSchema.parse(request.body)
      const hashedPassword = await bcrypt.hash(userSchema.password, 10)
      const user: iCreateUser = {
        name: userSchema.name,
        familyName: userSchema.familyName,
        email: userSchema.email,
        password: hashedPassword,
      }

      await this.repository.create(user)
      return reply.status(201).send({ success: true })
    } catch {
      return reply.status(500).send({ error: 'internal_server_error' })
    }
  }
}
