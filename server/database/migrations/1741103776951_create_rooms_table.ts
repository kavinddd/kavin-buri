import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rooms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code').notNullable().unique()
      table.integer('room_type_id').unsigned().references('id').inTable('room_types')
      table
        .enu('status', ['AVAILABLE', 'OUT_OF_SERVICE', 'OCCUPIED', 'RESERVED'])
        .notNullable()
        .defaultTo('AVAILABLE')
      table.smallint('floor_no').notNullable().unsigned()
      table.timestamp('updated_at').notNullable()
      table.integer('updated_by').unsigned().references('id').inTable('users') // Foreign key reference to app_users table
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
