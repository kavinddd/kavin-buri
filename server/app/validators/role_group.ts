import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { directionEnum, roleNameEnum } from '../enums.js'
import { roleGroupSortEnum } from '#models/role_group'
import { RoleNameType } from '../types.js'

export const searchRoleGroup = vine.object({
  name: vine.string().optional(),
  role: vine.enum(roleNameEnum).optional(),
  roles: vine
    .string()
    .optional()
    .transform((val) => (val ? val.split(',').map((v) => v.trim() as RoleNameType) : [])),
})

export const searchRoleGroupValidator = vine.compile(searchRoleGroup)

export const paginateRoleGroupValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(roleGroupSortEnum).optional(),
    ...searchRoleGroup.getProperties(),
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
