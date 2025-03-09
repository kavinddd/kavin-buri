import Role from '#models/role'
import User from '#models/user'
import { RoleNameType } from './types.js'

export function userHasRole(user: User, roleNames2: RoleNameType[]): boolean {
  return hasAnyRole(user.roles, roleNames2)
}

export function hasAnyRole(roles: Role[], roleNames2: RoleNameType[]): boolean {
  const roleNames = roles.map((r) => r.name)
  return hasAnyRoleName(roleNames, roleNames2)
}

export function hasAnyRoleName(roleNames1: RoleNameType[], roleNames2: RoleNameType[]): boolean {
  return roleNames1.some((rn) => roleNames2.includes(rn))
}
