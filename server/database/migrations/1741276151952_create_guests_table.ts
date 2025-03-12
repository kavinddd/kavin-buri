import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('citizen_id').notNullable().unique()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('nationality').notNullable()
      table.date('date_of_birth').notNullable()

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
