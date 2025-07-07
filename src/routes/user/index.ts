import { FastifyInstance } from 'fastify'
import { iUserController } from '../../types/user/user-controller'
import { isValidEmail } from '../../middlewares/user/check-email-valid'
import { isValidPassword } from '../../middlewares/user/check-password-valid'
import { isNameAndFamilyNameValid } from '../../middlewares/user/check-name-family-name-valid'
import { iCreateUserService } from '../../types/user/create-user-service'

export class UserController implements iUserController {
  createUserService: iCreateUserService

  constructor(createUserService: iCreateUserService) {
    this.createUserService = createUserService
    this.userRoutes = this.userRoutes.bind(this)
  }

  async userRoutes(app: FastifyInstance) {
    app.post(
      '/create',
      { preHandler: [isValidEmail, isValidPassword, isNameAndFamilyNameValid] },
      async (request, reply) => {
        return await this.createUserService.perform(request, reply)
      },
    )
  }
}
