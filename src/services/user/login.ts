import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcrypt'
import { iLoginService } from '../../types/user/login-service'
import { iUserRepository } from '../../types/user/user-repository'
import { iLogin, loginSchema } from '../../types/user/login.d'
import { iSessionRepository } from '../../types/session/session-repository'

export class LoginService implements iLoginService {
  userRepository: iUserRepository
  sessionRepository: iSessionRepository

  constructor(
    userRepository: iUserRepository,
    sessionRepository: iSessionRepository,
  ) {
    this.userRepository = userRepository
    this.sessionRepository = sessionRepository
  }

  async perform(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const schema = loginSchema.parse(request.body)
      const login: iLogin = {
        email: schema.email,
        password: schema.password,
      }
      const user = await this.userRepository.getByEmail(login.email)
      const correctPassword = await bcrypt.compare(
        login.password,
        user?.password || '',
      )

      if (!user || !correctPassword) {
        return reply.status(401).send({ error: 'email_or_password_incorrect' })
      }

      const sessionID = await this.handleSession(user.id)

      return reply.status(200).send({
        email: user.email,
        name: user.name,
        familyName: user.familyName,
        id: user.id,
        session: sessionID,
      })
    } catch {
      return reply.status(500).send({ error: 'internal_server_error' })
    }
  }

  private async handleSession(userID: string): Promise<string> {
    const session = await this.sessionRepository.create(userID)

    await this.sessionRepository.removeLast(userID)

    return session
  }
}
