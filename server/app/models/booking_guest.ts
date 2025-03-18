import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { BookingId } from './booking.js'
import type { GuestId } from './guest.js'

export default class BookingGuest extends BaseModel {
  @column({ isPrimary: true })
  declare bookingId: BookingId

  @column({ isPrimary: true })
  declare guestId: GuestId
}
