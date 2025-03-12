import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { type UUID } from 'crypto'
import type { BookingSourceType, BookingStatusType, RoomType } from '../types.js'
import BookingLog from '#models/booking_log'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { PaginateReq } from '../paginate.js'
import { ModelAttributes } from '@adonisjs/lucid/types/model'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingId

  @column()
  declare paymentId: string

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

  @column()
  declare source: BookingSourceType

  @hasOne(() => BookingLog, {
    onQuery: (query) => {
      query.orderBy('created_at').limit(1)
    },
  })
  declare latestLog: HasOne<typeof BookingLog>

  @hasMany(() => BookingLog)
  declare logs: HasMany<typeof BookingLog>
}

export type BookingId = number

export type BookingType = ModelAttributes<InstanceType<typeof Booking>>
export type BookingSort = Extract<keyof BookingType, 'id' | 'checkInDate'>
export const bookingSortEnum: BookingSort[] = ['id', 'checkInDate']
export type BookingSearch = Partial<BookingType>
export type BookingPaginateReq = PaginateReq<BookingSearch, BookingSort>
