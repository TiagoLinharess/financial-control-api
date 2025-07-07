import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { iUser } from '../../types/user/user'
import { iUserRepository } from '../../types/user/user-repository'

const emailSchema = z.object({
  email: z.string(),
})

export async function emailExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userRepository: iUserRepository =
    request.server.getDecorator('userRepository')
  const { email } = emailSchema.parse(request.body)
  const user: iUser | undefined = await userRepository.getByEmail(email)

  if (user) {
    return reply.status(400).send({ error: 'email_exists' })
  }
}
