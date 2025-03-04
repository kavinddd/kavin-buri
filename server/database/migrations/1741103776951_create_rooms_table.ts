import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable().unique()
      table.enu('room_type', ['SUPERIOR_TWIN', 'SUPERIOR_DOUBLE', 'DELUXE', 'SUITE']).notNullable()
      table.enu('status', ['AVAILABLE', 'OUT_OF_SERVICE', 'OCCUPIED', 'RESERVED']).notNullable()
      table.smallint('floor_no').notNullable().unsigned()
      table.smallint('max_adult').notNullable()
      table.smallint('max_children').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
      table.integer('updated_by').unsigned().references('id').inTable('users') // Foreign key reference to app_users table
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
