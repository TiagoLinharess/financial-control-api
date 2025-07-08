import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcrypt'
import { iEditEmailService } from '../../types/user/edit-email-service'
import { iUserRepository } from '../../types/user/user-repository'
import { iSessionRepository } from '../../types/session/session-repository'
import { editEmailSchema, iEditEmail } from '../../types/user/edit-email.d'
import { idParamSchema } from '../../types/commons/id-params.d'

export class EditEmailService implements iEditEmailService {
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
    const { id } = idParamSchema.parse(request.params)
    const schema = editEmailSchema.parse(request.body)
    const editEmail: iEditEmail = {
      email: schema.email,
      password: schema.password,
      newEmail: schema.newEmail,
    }

    if (editEmail.email === editEmail.newEmail) {
      return reply.status(400).send({ error: 'new_email_equal_current_email' })
    }

    const user = await this.userRepository.getById(id)
    const newEmailExists = await this.handleEmailExists(editEmail.newEmail)

    if (newEmailExists === true) {
      return reply.status(400).send({ error: 'new_email_already_exists' })
    }

    const correctPassword = await bcrypt.compare(
      editEmail.password,
      user?.password || '',
    )

    const correctEmail = editEmail.email === user?.email

    if (!user || !correctPassword || !correctEmail) {
      return reply.status(401).send({ error: 'email_or_password_incorrect' })
    }

    await this.userRepository.updateEmail(editEmail, id)
    await this.sessionRepository.removeAll(id)

    return reply.status(200).send({
      success: true,
    })
  }

  private async handleEmailExists(newEmail: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(newEmail)
    return !!user
  }
}
