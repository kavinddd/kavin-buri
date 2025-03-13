import vine from '@vinejs/vine'
import { directionEnum, roleNameEnum } from '../enums.js'
import { userSortEnum } from '#models/user'
import { Infer } from '@vinejs/vine/types'

export const paginateUserValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(userSortEnum).optional(),

    // search, not common
    fullName: vine.string().optional(),
    username: vine.string().optional(),
    role: vine.enum(roleNameEnum).optional(),
    roles: vine.array(vine.enum(roleNameEnum)).optional(),
  })
)
export type PaginateUserReq = Infer<typeof paginateUserValidator>

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    username: vine.string(),
    password: vine.string(),
  })
)
export type CreateUserReq = Infer<typeof createUserValidator>

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().optional(),
    password: vine.string().optional(),
  })
)
export type UpdateUserReq = Infer<typeof updateUserValidator>
