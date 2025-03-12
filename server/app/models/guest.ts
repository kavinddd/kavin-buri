import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { PaginateReq } from '../paginate.js'
import type { UserId } from './user.js'

export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  declare id: GuestId

  @column()
  declare citizenId: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nationality: string

  @column.date()
  declare dateOfBirth: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare updatedBy: UserId

  @column()
  declare createdBy: UserId
}

export type GuestId = number

export type GuestType = ModelAttributes<InstanceType<typeof Guest>>
export type GuestSort = Extract<keyof GuestType, 'nationality' | 'dateOfBirth' | 'updatedAt'>
export const guestSortEnum: GuestSort[] = ['nationality', 'dateOfBirth', 'updatedAt']
export type GuestSearch = Partial<GuestType>
export type GuestPaginateReq = PaginateReq<GuestSearch, GuestSort>
