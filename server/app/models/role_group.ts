import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import User, { type UserId } from '#models/user'
import { PaginateReq } from '../paginate.js'
import { ModelAttributes } from '@adonisjs/lucid/types/model'
import { RoleNameType } from '../types.js'

export default class RoleGroup extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoleGroupId

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare createdBy: UserId

  @column()
  declare updatedBy: UserId

  @belongsTo(() => User)
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => User)
  declare updatedByUser: BelongsTo<typeof User>

  @manyToMany(() => Role, {
    pivotTable: 'role_group_role',
  })
  declare roles: ManyToMany<typeof Role>
}

export type RoleGroupId = number

export type RoleGroupType = ModelAttributes<InstanceType<typeof RoleGroup>>
export type RoleGroupSort = Extract<keyof RoleGroupType, 'id' | 'updatedAt'>
export const roleGroupSortEnum: RoleGroupSort[] = ['id', 'updatedAt']
export type RoleGroupSearch = Partial<RoleGroupType> & {
  roles: RoleNameType[]
}
export type RoleGroupPaginateReq = PaginateReq<RoleGroupSearch, RoleGroupSort>
