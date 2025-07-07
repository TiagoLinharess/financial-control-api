import { FastifyRequest, FastifyReply } from 'fastify'
import { iLoginService } from '../../types/user/login-service'
import { iUserRepository } from '../../types/user/user-repository'

export class LoginService implements iLoginService {
  repository: iUserRepository

  constructor(repository: iUserRepository) {
    this.repository = repository
  }

  perform(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(200).send({ success: true })
  }
}
