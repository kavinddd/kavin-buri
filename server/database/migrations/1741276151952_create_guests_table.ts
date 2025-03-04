import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'guests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('citizen_id').notNullable().unique()
      table.string('title').notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('nationality').notNullable()
      table.date('date_of_birth').notNullable()

      table.integer('booking_log_id').references('id').inTable('booking_logs')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
