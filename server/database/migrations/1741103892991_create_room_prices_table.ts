import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'room_prices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE') // Foreign key reference to rooms table
      table.integer('price').notNullable()
      table.date('date')
      table.primary(['room_id', 'date']) // Composite primary key

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
