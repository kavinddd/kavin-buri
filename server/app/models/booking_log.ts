import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Booking from '#models/booking'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from '#models/room'
import type { BookingStatusType } from '../types.js'
import User from '#models/user'

export default class BookingLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Booking)
  declare bookingId: BelongsTo<typeof Booking>

  @belongsTo(() => Room)
  declare roomId: BelongsTo<typeof Room>

  @column()
  declare status: BookingStatusType

  @column()
  declare remark: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => User)
  declare createdBy: BelongsTo<typeof User>
}
