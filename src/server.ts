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

const app = fastify()

// Authentication flow objects
const userRepository: iUserRepository = new UserRepository()
const loginService: iLoginService = new LoginService(userRepository)
const createUserService: iCreateUserService = new CreateUserService(
  userRepository,
)
const userController: iUserController = new UserController(
  createUserService,
  loginService,
)

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
