import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser, createUserSchema } from '../../types/user/create-user.d'
import { UserRepository } from '../../repository/user'

export class UserService {
  repository = new UserRepository()

  async create(request: FastifyRequest, reply: FastifyReply) {
    const userSchema = createUserSchema.parse(request.body)
    const user: CreateUser = {
      name: userSchema.name,
      familyName: userSchema.familyName,
      email: userSchema.email,
      password: userSchema.password,
    }

    await this.emailExists(reply, user)
    await this.repository.create(user)

    return reply.status(201).send()
  }

  private async emailExists(reply: FastifyReply, userCreateModel: CreateUser) {
    const user = await this.repository.get(userCreateModel.email)

    if (user) {
      reply.status(400).send({
        error: 'this email already exists',
      })
    }
  }
}
