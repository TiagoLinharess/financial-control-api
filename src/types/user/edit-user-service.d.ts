import { FastifyReply, FastifyRequest } from 'fastify'

export interface iEditUserService {
  perform(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
}
