import { FastifyInstance } from 'fastify'
import { CreateUserService } from '../services/user/create-user'
import { isValidEmail } from '../middlewares/user/check-email-valid'
import { isValidPassword } from '../middlewares/user/check-password-valid'
import { isNameAndFamilyNameValid } from '../middlewares/user/check-name-famili-name-valid'
import { UserRepository } from '../repository/user'

export async function userRoutes(app: FastifyInstance) {
  const repository = new UserRepository()
  const createUserService = new CreateUserService(repository)

  app.post(
    '/create',
    { preHandler: [isValidEmail, isValidPassword, isNameAndFamilyNameValid] },
    async (request, reply) => {
      return await createUserService.perform(request, reply)
    },
  )
}
