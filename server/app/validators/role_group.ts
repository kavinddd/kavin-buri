import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { directionEnum, roleNameEnum } from '../enums.js'
import { roleGroupSortEnum } from '#models/role_group'
import { commaSeperatedArray } from './commons.js'
import { RoleNameType } from '../types.js'

export const paginateRoleGroupValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(roleGroupSortEnum).optional(),

    // search, not common
    name: vine.string().optional(),
    role: vine.enum(roleNameEnum).optional(),
    roles: vine
      .string()
      .optional()
      .transform((val) => (val ? val.split(',').map((v) => v.trim() as RoleNameType) : [])),
  })
)
export type PaginateRoleGroupReq = Infer<typeof paginateRoleGroupValidator>

export const createRoleGroupValidator = vine.compile(
  vine.object({
    roles: vine.array(vine.enum(roleNameEnum)).minLength(1),
    name: vine.string(),
  })
)
export type CreateRoleGroupReq = Infer<typeof createRoleGroupValidator>

export const updateRoleGroupValidator = vine.compile(
  vine.object({
    roles: vine.array(vine.enum(roleNameEnum)).optional(),
    name: vine.string().optional(),
  })
)
export type UpdateRoleGroupReq = Infer<typeof updateRoleGroupValidator>
