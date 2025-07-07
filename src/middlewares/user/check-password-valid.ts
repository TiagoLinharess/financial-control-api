import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const passwordSchema = z.object({
  password: z.string(),
})

export async function isValidPassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { password } = passwordSchema.parse(request.body)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  if (!passwordRegex.test(password)) {
    return reply.status(400).send({
      error: 'password_invalid',
    })
  }
}
