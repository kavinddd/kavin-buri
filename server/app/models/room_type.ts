import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { PaginateReq } from '../paginate.js'
import type { RoomTypeNameType } from '../types.js'

export default class RoomType extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoomTypeId

  @column()
  declare name: RoomTypeNameType

  @column()
  declare areaSqMeter: number

  @column()
  declare maxAdult: number

  @column()
  declare maxChildren: number
}

export type RoomTypeId = number

export type RoomTypeType = ModelAttributes<InstanceType<typeof RoomType>>
export type RoomTypeSort = Extract<
  keyof RoomTypeType,
  'id' | 'maxAdult' | 'maxChildren' | 'areaSqMeter'
>
export const roomSortEnum: RoomTypeSort[] = [
  'id',
  'maxAdult',
  'maxChildren',
  'maxAdult',
  'areaSqMeter',
]
export type RoomSearch = Partial<RoomTypeType>
export type RoomPaginateReq = PaginateReq<RoomSearch, RoomTypeSort>
