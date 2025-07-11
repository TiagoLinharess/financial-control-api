import { FastifyReply, FastifyRequest } from 'fastify'

export interface iLoginService {
  perform(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
}
