import { FastifyReply, FastifyRequest } from 'fastify'
import { createUserSchema } from '../../types/user/create-user.d'

export async function isNameAndFamilyNameValid(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, familyName } = createUserSchema.parse(request.body)

  if (!name || !name.trim() || !familyName || !familyName.trim()) {
    return reply.status(400).send({
      error: 'name_or_family_name_empty',
    })
  }
}
