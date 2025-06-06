import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_role_group'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('role_group_id')
        .unsigned()
        .references('id')
        .inTable('role_groups')
        .onDelete('CASCADE')
        .notNullable()

      table.primary(['user_id', 'role_group_id']) // Composite primary key
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
