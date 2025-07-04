import { FastifyInstance } from 'fastify'
import { UserService } from '../services/user'

export async function userRoutes(app: FastifyInstance) {
  const service = new UserService()

  app.post('/create', async (request, reply) => {
    return await service.create(request, reply)
  })
}
