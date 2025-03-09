import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { userHasRole } from '../roles.js'
import type { RoleNameType } from '../types.js'

export const READ_ROLES_ROLE_GROUP: RoleNameType[] = ['ADMIN', 'READ_ROLE_GROUP', 'EDIT_ROLE_GROUP']
export const EDIT_ROLES_ROLE_GROUP: RoleNameType[] = ['ADMIN', 'READ_ROLE_GROUP']

export default class RoleGroupPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_ROLE_GROUP)
  }

  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_ROLE_GROUP)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROLE_GROUP)
  }

  update(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROLE_GROUP)
  }

  delete(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_ROLE_GROUP)
  }
}
