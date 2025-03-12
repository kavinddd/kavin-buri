import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { directionEnum, roleNameEnum, roomStatusEnum, roomTypeEnum } from '../enums.js'
import { roomSortEnum } from '#models/room'

export const paginateRoomValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(roomSortEnum).optional(),

    // search, not common
    name: vine.string().optional(),
    role: vine.enum(roleNameEnum).optional(),
    roles: vine.array(vine.enum(roleNameEnum)).optional(),
  })
)
export type PaginateRoomReq = Infer<typeof paginateRoomValidator>

export const createRoomValidator = vine.compile(
  vine.object({
    code: vine.string(),
    roomType: vine.enum(roomTypeEnum),
    status: vine.enum(roomStatusEnum),
    floorNo: vine.number().min(1).max(10),
    maxAdult: vine.number().min(1).max(10),
    maxChildren: vine.number().min(1).max(10),
  })
)
export type CreateRoomReq = Infer<typeof createRoomValidator>

export const updateRoomValidator = vine.compile(
  vine.object({
    code: vine.string().optional(),
    roomType: vine.enum(roomTypeEnum).optional(),
    status: vine.enum(roomStatusEnum).optional(),
    floorNo: vine.number().min(1).max(10).optional(),
    maxAdult: vine.number().min(1).max(10).optional(),
    maxChildren: vine.number().min(1).max(10).optional(),
  })
)
export type UpdateRoomReq = Infer<typeof updateRoomValidator>
