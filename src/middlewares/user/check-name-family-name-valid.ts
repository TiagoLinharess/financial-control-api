import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const nameSchema = z.object({
  name: z.string(),
  familyName: z.string(),
})

export async function isNameAndFamilyNameValid(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, familyName } = nameSchema.parse(request.body)

  if (!name || !name.trim() || !familyName || !familyName.trim()) {
    return reply.status(400).send({
      error: 'name_or_family_name_empty',
    })
  }
}
