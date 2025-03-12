import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { RoomStatusType, RoomType } from '../types.js'
import User, { type UserId } from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { PaginateReq } from '../paginate.js'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoomId

  @column()
  declare code: string

  @column()
  declare roomType: RoomType

  @column()
  declare status: RoomStatusType

  @column()
  declare floorNo: number

  @column()
  declare maxAdult: number

  @column()
  declare maxChildren: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare updatedBy: UserId

  @belongsTo(() => User)
  declare updatedByUser: BelongsTo<typeof User>
}

export type RoomId = number

export type RoomModelType = ModelAttributes<InstanceType<typeof Room>>
export type RoomSort = Extract<
  keyof RoomModelType,
  'id' | 'updatedAt' | 'updatedBy' | 'maxAdult' | 'floorNo'
>
export const roomSortEnum: RoomSort[] = ['id', 'updatedAt', 'updatedBy', 'maxAdult', 'floorNo']
export type RoomSearch = Partial<RoomModelType>
export type RoomPaginateReq = PaginateReq<RoomSearch, RoomSort>
