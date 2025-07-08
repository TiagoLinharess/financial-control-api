import { FastifyReply, FastifyRequest } from 'fastify'

export interface iEditEmailService {
  perform(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
}
