import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BookingSourceType, BookingStatusType, RoomType } from '../types.js'
import { PaginateReq } from '../paginate.js'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import type { UserId } from './user.js'
import type { RoomTypeId } from './room_type.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingId

  @column()
  declare paymentId: string

  @column()
  declare roomTypeId: RoomTypeId

  @column()
  declare confirmBookingNo: string

  @column()
  declare contactName: string

  @column()
  declare email: string

  @column()
  declare contactNumber: string

  @column()
  declare remark: string

  @column()
  declare status: BookingStatusType

  @column()
  declare source: BookingSourceType

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
  declare createdBy: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: UserId

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

export type BookingId = number

export type BookingType = ModelAttributes<InstanceType<typeof Booking>>
export type BookingSort = Extract<keyof BookingType, 'id' | 'checkInDate'>
export const bookingSortEnum: BookingSort[] = ['id', 'checkInDate']
export type BookingSearch = Partial<BookingType>
export type BookingPaginateReq = PaginateReq<BookingSearch, BookingSort>
