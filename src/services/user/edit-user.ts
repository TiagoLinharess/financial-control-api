import { FastifyRequest, FastifyReply } from 'fastify'
import { iEditUserService } from '../../types/user/edit-user-service'
import { iUserRepository } from '../../types/user/user-repository'
import { editUserSchema, iEditUser } from '../../types/user/edit-user.d'
import { idParamSchema } from '../../types/commons/id-params.d'

export class EditUserService implements iEditUserService {
  userRepository: iUserRepository

  constructor(userRepository: iUserRepository) {
    this.userRepository = userRepository
  }

  async perform(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    try {
      const { id } = idParamSchema.parse(request.params)
      const schema = editUserSchema.parse(request.body)
      const editedUser: iEditUser = {
        name: schema.name,
        familyName: schema.familyName,
      }

      await this.userRepository.updateUser(editedUser, id)

      return reply.status(200).send(editedUser)
    } catch {
      return reply.status(500).send({ error: 'internal_server_error' })
    }
  }
}
