import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '../../types/user/create-user.d'

export async function isValidPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password } = createUserSchema.parse(request.body)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  if (!passwordRegex.test(password)) {
    return reply.status(400).send({
      error: 'password_invalid',
    })
  }
}
