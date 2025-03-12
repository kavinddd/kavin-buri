import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import type { RoleNameType } from '../types.js'
import { userHasRole } from '../roles.js'

export const READ_ROLES_GUEST: RoleNameType[] = ['ADMIN', 'READ_GUEST', 'EDIT_GUEST']
export const EDIT_ROLES_GUEST: RoleNameType[] = ['ADMIN', 'EDIT_GUEST']

export default class GuestPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_GUEST)
  }

  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_GUEST)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_GUEST)
  }

  update(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_GUEST)
  }

  delete(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_GUEST)
  }
}
