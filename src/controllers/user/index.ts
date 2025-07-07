import { FastifyInstance } from 'fastify'
import { iUserController } from '../../types/user/user-controller'
import { isValidEmail } from '../../middlewares/user/check-email-valid'
import { isValidPassword } from '../../middlewares/user/check-password-valid'
import { isNameAndFamilyNameValid } from '../../middlewares/user/check-name-family-name-valid'
import { iCreateUserService } from '../../types/user/create-user-service'
import { iLoginService } from '../../types/user/login-service'
import { isSessionValid } from '../../middlewares/session/check-session-valid'
import { emailExists } from '../../middlewares/user/check-email-exists'
import { iEditUserService } from '../../types/user/edit-user-service'

export class UserController implements iUserController {
  createUserService: iCreateUserService
  loginService: iLoginService
  editUserService: iEditUserService

  constructor(
    createUserService: iCreateUserService,
    loginService: iLoginService,
    editUserService: iEditUserService,
  ) {
    this.createUserService = createUserService
    this.loginService = loginService
    this.editUserService = editUserService
    this.userRoutes = this.userRoutes.bind(this)
  }

  async userRoutes(app: FastifyInstance) {
    app.post(
      '/create',
      {
        preHandler: [
          isValidEmail,
          isValidPassword,
          isNameAndFamilyNameValid,
          emailExists,
        ],
      },
      async (request, reply) => {
        return await this.createUserService.perform(request, reply)
      },
    )

    app.post(
      '/login',
      { preHandler: [isValidEmail] },
      async (request, reply) => {
        return await this.loginService.perform(request, reply)
      },
    )

    app.put(
      '/:id',
      { preHandler: [isSessionValid] },
      async (request, reply) => {
        return await this.editUserService.perform(request, reply)
      },
    )

    app.delete(
      '/:id',
      { preHandler: [isValidEmail, isSessionValid] },
      async (request, reply) => {
        return await this.loginService.perform(request, reply)
      },
    )
  }
}
