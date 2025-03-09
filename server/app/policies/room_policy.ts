import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import type { RoleNameType } from '../types.js'
import { userHasRole } from '../roles.js'

export const READ_ROLES_ROOM: RoleNameType[] = ['ADMIN', 'READ_ROOM', 'EDIT_ROOM']
export const EDIT_ROLES_ROOM: RoleNameType[] = ['ADMIN', 'EDIT_ROOM']

export default class RoomPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_ROOM)
  }

  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_ROOM)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROOM)
  }

  update(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROOM)
  }

  delete(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROOM)
  }
}
