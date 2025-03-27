import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BookingSourceType, BookingStatusType, RoomTypeNameType } from '../types.js'
import { PaginateReq } from '../paginate.js'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import type { UserId } from './user.js'
import type { RoomTypeId } from './room_type.js'
import RoomType from './room_type.js'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import type { RoomId } from './room.js'
import Guest from './guest.js'
import Room from './room.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: BookingId

  @column()
  declare paymentId: string

  @column()
  declare roomTypeId: RoomTypeId

  @column()
  declare roomId: RoomId

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

  @belongsTo(() => RoomType)
  declare roomType: BelongsTo<typeof RoomType>

  @manyToMany(() => Guest, {
    pivotTable: 'booking_guest',
  })
  declare guests: ManyToMany<typeof Guest>

  @belongsTo(() => Room)
  declare room: BelongsTo<typeof Room>
}

export type BookingId = number

export type BookingType = ModelAttributes<InstanceType<typeof Booking>>
export type BookingSort = Extract<keyof BookingType, 'id' | 'checkInDate'>
export const bookingSortEnum: BookingSort[] = ['id', 'checkInDate']
export type BookingSearch = Partial<BookingType> & {
  roomTypeName?: RoomTypeNameType
  roomCode?: string
}
export type BookingPaginateReq = PaginateReq<BookingSearch, BookingSort>
