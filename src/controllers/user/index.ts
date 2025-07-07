import { FastifyInstance } from 'fastify'
import { iUserController } from '../../types/user/user-controller'
import { isValidEmail } from '../../middlewares/user/check-email-valid'
import { isValidPassword } from '../../middlewares/user/check-password-valid'
import { isNameAndFamilyNameValid } from '../../middlewares/user/check-name-family-name-valid'
import { iCreateUserService } from '../../types/user/create-user-service'
import { iLoginService } from '../../types/user/login-service'

export class UserController implements iUserController {
  createUserService: iCreateUserService
  loginService: iLoginService

  constructor(
    createUserService: iCreateUserService,
    loginService: iLoginService,
  ) {
    this.createUserService = createUserService
    this.loginService = loginService
    this.userRoutes = this.userRoutes.bind(this)
  }

  async userRoutes(app: FastifyInstance) {
    app.post(
      '/create',
      { preHandler: [isValidEmail, isValidPassword, isNameAndFamilyNameValid] },
      async (request, reply) => {
        return this.createUserService.perform(request, reply)
      },
    )

    app.post(
      '/login',
      { preHandler: [isValidEmail] },
      async (request, reply) => {
        return this.loginService.perform(request, reply)
      },
    )
  }
}
