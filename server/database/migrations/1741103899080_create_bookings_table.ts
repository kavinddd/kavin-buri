import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //https://github.com/orgs/adonisjs/discussions/1416
      table.uuid('payment_id').defaultTo(this.db.knexRawQuery('gen_random_uuid()'))
      table.integer('room_price').notNullable()
      table.enu('room_type', ['SUPERIOR_TWIN', 'SUPERIOR_DOUBLE', 'DELUXE', 'SUITE']).notNullable()
      table.string('contact_name').notNullable()
      table.string('email').notNullable()
      table.string('contact_number').notNullable()
      table.integer('num_adult').notNullable()
      table.integer('num_children').notNullable()
      table.date('check_in_date').notNullable()
      table.date('check_out_date').notNullable()
      table.boolean('has_abf').defaultTo(false) // ABF included?
      table.boolean('has_transportation').defaultTo(false) // Transportation included?
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
