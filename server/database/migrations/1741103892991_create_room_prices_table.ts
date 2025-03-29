import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'room_type_price'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('room_type_id').unsigned().references('id').inTable('room_types')
      table.date('date')

      table.integer('price').unsigned().notNullable()

      table.timestamp('updated_at').notNullable()
      table.integer('updated_by').unsigned().references('id').inTable('users')
      table.timestamp('created_at').notNullable()
      table.integer('created_by').unsigned().references('id').inTable('users')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
