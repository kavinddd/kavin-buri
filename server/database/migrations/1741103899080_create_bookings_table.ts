import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      //https://github.com/orgs/adonisjs/discussions/1416
      table.uuid('payment_id').defaultTo(this.db.knexRawQuery('gen_random_uuid()'))
      table.integer('room_type_id').unsigned().references('id').inTable('room_types').notNullable()
      table.integer('room_id').unsigned().references('id').inTable('rooms')
      table.string('confirm_booking_no').unique()
      table.string('contact_name').notNullable()
      table.string('email').notNullable()
      table.string('contact_number').notNullable()
      table.text('remark')
      table
        .enu('status', ['RESERVED', 'CHECKED-IN', 'CHECKED-OUT', 'NO-SHOW', 'CANCELLED'])
        .notNullable()
        .defaultTo('RESERVED')
      table
        .enu('source', ['WALK-IN', 'PHONE', 'WEBSITE', 'OTHERS'])
        .notNullable()
        .defaultTo('OTHERS')

      table.date('check_in_date').notNullable()
      table.date('check_out_date').notNullable()
      table.smallint('num_adult').notNullable()
      table.smallint('num_children').notNullable()
      table.integer('room_price').unsigned().notNullable()
      table.boolean('has_abf').defaultTo(false)
      table.boolean('has_transportation').defaultTo(false)

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
