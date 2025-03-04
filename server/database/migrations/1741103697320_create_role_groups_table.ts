import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_groups'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
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
