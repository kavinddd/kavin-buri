import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { RoleGroupId } from './role_group.js'
import type { RoleId } from './role.js'

export default class RoleGroupRole extends BaseModel {
  static table = 'role_group_role'
  @column({ isPrimary: true })
  declare roleGroupId: RoleGroupId

  @column({ isPrimary: true })
  declare roleId: RoleId
}
