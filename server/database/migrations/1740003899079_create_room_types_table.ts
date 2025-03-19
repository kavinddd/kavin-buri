import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'room_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.float('area_sq_meter')
      table.smallint('max_adult').notNullable()
      table.smallint('max_children').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
