import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role_group_role'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('role_group_id')
        .unsigned()
        .references('id')
        .inTable('role_groups')
        .onDelete('CASCADE')

      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE')

      table.primary(['role_group_id', 'role_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
