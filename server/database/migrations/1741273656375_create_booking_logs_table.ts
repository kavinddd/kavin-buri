import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'booking_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('booking_id').unsigned().references('id').inTable('bookings').notNullable()
      table.integer('room_id').unsigned().references('id').inTable('rooms')
      table
        .enu('status', ['RESERVED', 'CHECKED-IN', 'CHECKED-OUT', 'NO-SHOW', 'CANCELLED'])
        .notNullable()
        .defaultTo('RESERVED')

      table.text('remark')

      table.timestamp('created_at')
      table.integer('created_by').unsigned().references('id').inTable('users') // Foreign key reference to app_users table
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
