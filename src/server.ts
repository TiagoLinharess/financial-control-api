import fastify from 'fastify'
import { env } from './env'
import { iUserController } from './types/user/user-controller'
import { UserController } from './controllers/user'
import { CreateUserService } from './services/user/create-user'
import { UserRepository } from './repositories/user'
import { iCreateUserService } from './types/user/create-user-service'
import { iUserRepository } from './types/user/user-repository'
import { iLoginService } from './types/user/login-service'
import { LoginService } from './services/user/login'
import { iSessionRepository } from './types/session/session-repository'
import { SessionRepository } from './repositories/session'
import { iEditUserService } from './types/user/edit-user-service'
import { EditUserService } from './services/user/edit-user'

const app = fastify()

// Session
const sessionRepository: iSessionRepository = new SessionRepository()

// Authentication flow objects
const userRepository: iUserRepository = new UserRepository()
const editUserService: iEditUserService = new EditUserService(userRepository)
const loginService: iLoginService = new LoginService(
  userRepository,
  sessionRepository,
)
const createUserService: iCreateUserService = new CreateUserService(
  userRepository,
)
const userController: iUserController = new UserController(
  createUserService,
  loginService,
  editUserService,
)

// Fastify decorators
app.decorate('sessionRepository', sessionRepository)
app.decorate('userRepository', userRepository)

// Fastify registers
app.register(userController.userRoutes, {
  prefix: 'user',
})

// Fastify
app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
