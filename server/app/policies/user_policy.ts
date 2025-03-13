import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { RoleNameType } from '../types.js'
import { userHasRole } from '../roles.js'

export const READ_USERS_ROOM: RoleNameType[] = ['ADMIN', 'READ_USER', 'EDIT_USER']
export const EDIT_USERS_ROOM: RoleNameType[] = ['ADMIN', 'EDIT_USER']

export default class UserPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    return userHasRole(user, READ_USERS_ROOM)
  }

  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_USERS_ROOM)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_USERS_ROOM)
  }

  update(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_USERS_ROOM)
  }

  delete(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_USERS_ROOM)
  }
}
