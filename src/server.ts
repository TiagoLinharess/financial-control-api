import fastify from 'fastify'
import { env } from './env'
import { iUserController } from './types/user/user-controller'
import { UserController } from './controllers/user'
import { CreateUserService } from './services/user/create-user'
import { UserRepository } from './repositories/user'
import { iCreateUserService } from './types/user/create-user-service'

const app = fastify()

const userRepository = new UserRepository()
const createUserService: iCreateUserService = new CreateUserService(
  userRepository,
)
const userController: iUserController = new UserController(createUserService)

app.register(userController.userRoutes, {
  prefix: 'user',
})

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
