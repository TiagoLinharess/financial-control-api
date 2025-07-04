import fastify from 'fastify'
import { env } from './env'
import { userRoutes } from './routes/user'

const app = fastify()

app.register(userRoutes, {
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
