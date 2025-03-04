import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { RoomStatusType, RoomType } from '../types.js'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

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

  @belongsTo(() => User)
  declare updatedBy: BelongsTo<typeof User>
}
