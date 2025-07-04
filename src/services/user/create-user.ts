import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser, createUserSchema } from '../../types/user/create-user.d'
import { UserRepository } from '../../repository/user'

export class CreateUserService {
  repository: UserRepository

  constructor(repository: UserRepository) {
    this.repository = repository
  }

  async perform(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userSchema = createUserSchema.parse(request.body)
      const user: CreateUser = {
        name: userSchema.name,
        familyName: userSchema.familyName,
        email: userSchema.email,
        password: userSchema.password,
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

  private async emailExists(userCreateModel: CreateUser): Promise<boolean> {
    try {
      const user = await this.repository.get(userCreateModel.email)
      return !!user
    } catch {
      throw new Error()
    }
  }
}
