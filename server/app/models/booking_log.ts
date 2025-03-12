import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Booking from '#models/booking'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Room from '#models/room'
import type { BookingStatusType } from '../types.js'
import User, { type UserId } from '#models/user'

export default class BookingLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingLog

  @column()
  declare bookingId: number

  @column()
  declare roomId: number

  @column()
  declare status: BookingStatusType

  @column()
  declare remark: string

  @column()
  declare createdBy: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>

  @belongsTo(() => Booking)
  declare booking: BelongsTo<typeof Booking>

  @belongsTo(() => User)
  declare createdByUser: BelongsTo<typeof User>
}

export type BookingLogId = number
