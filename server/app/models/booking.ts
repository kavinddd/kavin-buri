import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { type UUID } from 'crypto'
import type { BookingStatusType, RoomType } from '../types.js'
import BookingLog from '#models/booking_log'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare paymentId: UUID

  @column()
  declare roomType: RoomType

  @column()
  declare status: BookingStatusType

  @column()
  declare contactName: string

  @column()
  declare email: string

  @column()
  declare contactNumber: string

  @column.date()
  declare checkInDate: DateTime

  @column.date()
  declare checkOutDate: DateTime

  @column()
  declare roomPrice: number

  @column()
  declare numAdult: number

  @column()
  declare numChildren: number

  @column()
  declare hasAbf: boolean

  @column()
  declare hasTransportation: boolean

  @hasOne(() => BookingLog, {
    onQuery: (query) => {
      query.orderBy('created_at').limit(1)
    },
  })
  declare latestLog: HasOne<typeof BookingLog>
}
