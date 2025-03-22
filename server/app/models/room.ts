import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import type { RoomStatusType, RoomTypeNameType } from '../types.js'
import User, { type UserId } from '#models/user'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { PaginateReq } from '../paginate.js'
import type { RoomTypeId } from './room_type.js'
import RoomType from './room_type.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoomId

  @column()
  declare code: string

  @column()
  declare roomTypeId: RoomTypeId

  @column()
  declare status: RoomStatusType

  @column()
  declare floorNo: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare updatedBy: UserId

  @belongsTo(() => User)
  declare updatedByUser: BelongsTo<typeof User>

  @belongsTo(() => RoomType)
  declare roomType: BelongsTo<typeof RoomType>
}

export type RoomId = number

export type RoomModelType = ModelAttributes<InstanceType<typeof Room>>
export type RoomSort = Extract<
  keyof RoomModelType,
  'id' | 'updatedAt' | 'updatedBy' | 'floorNo' | 'code'
>
export const roomSortEnum: RoomSort[] = ['id', 'updatedAt', 'updatedBy', 'floorNo', 'code']
export type RoomSearch = Partial<RoomModelType> & {
  roomTypeName?: RoomTypeNameType
}
export type RoomPaginateReq = PaginateReq<RoomSearch, RoomSort>
