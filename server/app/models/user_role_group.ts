import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { UserId } from './user.js'
import type { RoleGroupId } from './role_group.js'

export default class UserRoleGroup extends BaseModel {
  @column({ isPrimary: true })
  declare userId: UserId

  @column({ isPrimary: true })
  declare roleGroupId: RoleGroupId
}
