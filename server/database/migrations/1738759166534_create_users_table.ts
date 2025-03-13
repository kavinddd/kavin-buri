import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.string('full_name').nullable()

      table.string('username', 254).notNullable().unique()
      table.string('password').notNullable()

      table.boolean('is_active').notNullable().defaultTo(false)

      table.timestamp('created_at').notNullable()
      table.integer('created_by').unsigned().references('id').inTable('users')
      table.timestamp('updated_at').notNullable()
      table.integer('updated_by').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
