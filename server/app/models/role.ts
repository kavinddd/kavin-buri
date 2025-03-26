import { BaseModel, column } from '@adonisjs/lucid/orm'
import type { RoleNameType } from '../types.ts'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: RoleId

  @column()
  declare name: RoleNameType

  @column()
  declare description: string
}

export type RoleId = number
