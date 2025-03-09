import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import type { RoleNameType } from '../types.js'
import { userHasRole } from '../roles.js'

export const READ_ROLES_BOOKING_LOG: RoleNameType[] = ['ADMIN', 'EDIT_BOOKING', 'READ_BOOKING']
export const EDIT_ROLES_BOOKING_LOG: RoleNameType[] = ['ADMIN', 'EDIT_BOOKING']

export default class BookingLogPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_BOOKING_LOG)
  }

  get(user: User): AuthorizerResponse {
    return userHasRole(user, READ_ROLES_BOOKING_LOG)
  }

  create(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_BOOKING_LOG)
  }

  update(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_BOOKING_LOG)
  }

  delete(user: User): AuthorizerResponse {
    return userHasRole(user, EDIT_ROLES_BOOKING_LOG)
  }
}
