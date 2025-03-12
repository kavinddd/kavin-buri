import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { directionEnum, roleNameEnum, roomStatusEnum, roomTypeEnum } from '../enums.js'
import { roomSortEnum } from '#models/room'
import { DateTime } from 'luxon'
import { guestSortEnum } from '#models/guest'

export const paginateGuestValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(guestSortEnum).optional(),

    // search, not common
    citizenId: vine.string().optional(),
    firstName: vine.string().optional(),
    lastName: vine.string().optional(),
    nationality: vine.string().optional(),
    dateOfBirth: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
  })
)
export type PaginateGuestReq = Infer<typeof paginateGuestValidator>

export const createGuestValidator = vine.compile(
  vine.object({
    citizenId: vine.string(),
    firstName: vine.string(),
    lastName: vine.string(),
    nationality: vine.string(),
    dateOfBirth: vine.date().transform((date) => DateTime.fromJSDate(date)),
  })
)
export type CreateGuestReq = Infer<typeof createGuestValidator>

export const updateGuestValidator = vine.compile(
  vine.object({
    citizenId: vine.string().optional(),
    firstName: vine.string().optional(),
    lastNamme: vine.string().optional(),
    nationality: vine.string().optional(),
    dateOfBirth: vine
      .date()
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
  })
)
export type UpdateGuestReq = Infer<typeof updateGuestValidator>
