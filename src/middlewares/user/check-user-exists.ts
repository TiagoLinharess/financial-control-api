import { FastifyReply, FastifyRequest } from 'fastify'
import { iUserRepository } from '../../types/user/user-repository'
import { idParamSchema } from '../../types/commons/id-params.d'

export async function userExists(request: FastifyRequest, reply: FastifyReply) {
  const userRepository: iUserRepository =
    request.server.getDecorator('userRepository')
  const { id } = idParamSchema.parse(request.params)
  const user = await userRepository.getById(id)
  if (!user) return reply.status(404).send({ error: 'user_not_found' })
}
