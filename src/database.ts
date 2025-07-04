import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

function getConnection(): string | setupKnex.Knex.StaticConnectionConfig {
  if (env.DATABASE_CLIENT === 'sqlite') {
    return {
      filename: env.DATABASE_URL,
    }
  }

  return env.DATABASE_URL
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: getConnection(),
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
