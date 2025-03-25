import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { userHasRole } from '../roles.js'
import type { RoleNameType } from '../types.js'

export const READ_ROLES_PRICING: RoleNameType[] = ['ADMIN', 'READ_PRICING', 'EDIT_PRICING']
export const EDIT_ROLES_PRICING: RoleNameType[] = ['ADMIN', 'READ_PRICING']

export default class RoleGroupPolicy extends BasePolicy {
  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_PRICING)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_PRICING)
  }
}
