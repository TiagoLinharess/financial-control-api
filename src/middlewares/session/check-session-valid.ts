import { FastifyReply, FastifyRequest } from 'fastify'
import { iSessionRepository } from '../../types/session/session-repository'
import { iSession } from '../../types/session/session'
import { z } from 'zod'

const sessionHeaderSchema = z.object({
  session: z.string(),
})

export async function isSessionValid(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionRepository: iSessionRepository =
    request.server.getDecorator('sessionRepository')
  const schema = sessionHeaderSchema.parse(request.headers)

  const session: iSession | undefined = await sessionRepository.get(
    schema.session,
  )

  if (!session) {
    reply.status(401).send({
      error: 'session_missing',
    })
  }
}
