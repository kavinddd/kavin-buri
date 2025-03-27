import { BaseModel, belongsTo, column, dateColumn } from '@adonisjs/lucid/orm'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { PaginateReq } from '../paginate.js'
import { DateTime } from 'luxon'
import type { UserId } from './user.js'
import type { RoomTypeId } from './room_type.js'
import RoomType from './room_type.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RoomTypePrice extends BaseModel {
  static table = 'room_type_price'

  @column({ isPrimary: true })
  declare id: RoomTypePriceId

  @column()
  declare roomTypeId: RoomTypeId

  @dateColumn()
  declare date: DateTime

  @column()
  declare price: number

  @column()
  declare createdBy: UserId

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare updatedBy: UserId
  //
  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime

  @belongsTo(() => RoomType)
  declare roomType: BelongsTo<typeof RoomType>
}

export type RoomTypePriceId = number
export type RoomTypePriceType = ModelAttributes<InstanceType<typeof RoomTypePrice>>
export type RoomTypePriceSort = Extract<
  keyof RoomTypePriceType,
  'id' | 'roomTypeId' | 'date' | 'price' | 'updatedAt'
>
export const roomTypePriceSortEnum: RoomTypePriceSort[] = [
  'id',
  'roomTypeId',
  'date',
  'price',
  // 'updatedAt',
]
export type RoomTypePriceSearch = Partial<RoomTypePriceSort>
export type RoomPaginateReq = PaginateReq<RoomTypePriceSearch, RoomTypePriceSort>
