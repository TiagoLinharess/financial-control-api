import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '../../types/user/create-user.d'

export async function isValidEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = createUserSchema.parse(request.body)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return reply.status(400).send({
      error: 'email_invalid',
    })
  }
}
