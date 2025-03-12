import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasManyThrough, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasManyThrough, ManyToMany } from '@adonisjs/lucid/types/relations'
import RoleGroup from '#models/role_group'
import Role from '#models/role'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: UserId

  @column()
  declare fullName: string | null

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => RoleGroup, {
    pivotTable: 'user_role_group',
  })
  declare roleGroups: ManyToMany<typeof RoleGroup>

  // @hasManyThrough([() => Role, () => RoleGroup])
  // declare roles: HasManyThrough<typeof Role>
}

export type UserId = number
