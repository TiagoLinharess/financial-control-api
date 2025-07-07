import { FastifyReply, FastifyRequest } from 'fastify'

export interface iCreateUserService {
  perform(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
}
