import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_guest'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('booking_id')
        .unsigned()
        .references('id')
        .inTable('bookings')
        .onDelete('CASCADE')

      table.integer('guest_id').unsigned().references('id').inTable('guests').onDelete('CASCADE')

      table.primary(['booking_id', 'guest_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
