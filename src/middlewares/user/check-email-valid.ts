import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const emailSchema = z.object({
  email: z.string(),
})

export async function isValidEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = emailSchema.parse(request.body)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return reply.status(400).send({
      error: 'email_invalid',
    })
  }
}
