import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const emailSchema = z.object({
  email: z.string(),
})

const newEmailSchema = z.object({
  newEmail: z.string(),
})

export async function isValidEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { email } = emailSchema.parse(request.body)
  await handleEmail(email, reply)
}

export async function isNewEmailValid(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { newEmail } = newEmailSchema.parse(request.body)
  await handleEmail(newEmail, reply)
}

async function handleEmail(email: string, reply: FastifyReply) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailRegex.test(email)) {
    return reply.status(400).send({
      error: 'email_invalid',
    })
  }
}
