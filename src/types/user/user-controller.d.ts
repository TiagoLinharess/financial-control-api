import { FastifyInstance } from 'fastify'

export interface iUserController {
  userRoutes(app: FastifyInstance): void
}
