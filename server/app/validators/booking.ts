import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import type { BookingStatusType, RoomTypeNameType } from '../types.js'
import { bookingSourceEnum, bookingStatusEnum, directionEnum, roomTypeNameEnum } from '../enums.js'
import { DateTime } from 'luxon'
import { bookingSortEnum } from '#models/booking'

export const paginateBookingValidator = vine.compile(
  vine.object({
    // common
    page: vine.number().optional(),
    size: vine.number().optional(),
    direction: vine.enum(directionEnum).optional(),

    // TODO: make this reusable

    // sort, semi common
    sort: vine.enum(bookingSortEnum).optional(),

    // search, not common
    contactName: vine.string().optional(),
    email: vine.string().optional(),
    source: vine.enum(bookingSourceEnum).optional(),
    status: vine.enum(bookingStatusEnum).optional(),
    roomType: vine.enum(roomTypeNameEnum).optional(),
    checkInDate: vine
      .date({ formats: ['YYYY-MM-DD', 'iso8601'] })
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    checkOutDate: vine
      .date({ formats: ['YYYY-MM-DD', 'iso8601'] })
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
  })
)
export type PaginateBookingReq = Infer<typeof paginateBookingValidator>

export const createBookingValidator = vine.compile(
  vine.object({
    roomTypeName: vine.enum(roomTypeNameEnum),
    contactName: vine.string().trim(),
    email: vine.string().trim(),
    contactNumber: vine.string().trim(),
    checkInDate: vine.date({ formats: ['iso8601'] }).transform((date) => DateTime.fromJSDate(date)),
    checkOutDate: vine
      .date({ formats: ['iso8601'] })
      .transform((date) => DateTime.fromJSDate(date)),
    roomPrice: vine.number(),
    numAdult: vine.number(),
    numChildren: vine.number(),
    hasAbf: vine.boolean(),
    hasTransportation: vine.boolean(),
    source: vine.enum(bookingSourceEnum),
  })
)
export type CreateBookingReq = Infer<typeof createBookingValidator>

export const updateBookingValidator = vine.compile(
  vine.object({
    roomTypeName: vine.enum(roomTypeNameEnum).optional(),
    contactName: vine.string().trim().optional(),
    email: vine.string().trim().optional(),
    contactNumber: vine.string().trim().optional(),
    checkInDate: vine
      .date({ formats: ['iso8601'] })
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    checkOutDate: vine
      .date({ formats: ['iso8601'] })
      .transform((date) => DateTime.fromJSDate(date))
      .optional(),
    roomPrice: vine.number().optional(),
    numAdult: vine.number().optional(),
    numChildren: vine.number().optional(),
    hasAbf: vine.boolean().optional(),
    hasTransportation: vine.boolean().optional(),
    source: vine.enum(bookingSourceEnum).optional(),

    guests: vine
      .array(
        vine.object({
          citizenId: vine.string(),
          firstName: vine.string(),
          lastName: vine.string(),
          nationality: vine.string(),
          dateOfBirth: vine
            .date({ formats: ['iso8601'] })
            .transform((date) => DateTime.fromJSDate(date)),
        })
      )
      .optional(),
  })
)
export type UpdateBookingReq = Infer<typeof updateBookingValidator>
