import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.uuid('id').primary()
    table.text('name').notNullable()
    table.text('family_name').notNullable()
    table.text('email').notNullable()
    table.text('password').notNullable()
    table.boolean('email_confirmed').defaultTo(false).notNullable()
    table.timestamp('delete_date').nullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
