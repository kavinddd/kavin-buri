import vine from '@vinejs/vine'
import { roomTypeNameEnum } from '../enums.js'
import { Infer } from '@vinejs/vine/types'

export const pricingGetValidator = vine.compile(
  vine.object({
    roomTypeName: vine.enum(roomTypeNameEnum),
    year: vine.number(),
    month: vine.number().min(1).max(12),
  })
)

export type PricingGetReq = Infer<typeof pricingGetValidator>

export const pricingSaveReqValidator = vine.compile(
  vine.object({
    roomTypeName: vine.enum(roomTypeNameEnum),
    year: vine.number(),
    month: vine.number().min(1).max(12),
    roomPrices: vine.array(
      vine.object({
        day: vine.number(),
        price: vine.number(),
      })
    ),
  })
)

export type PricingSaveReq = Infer<typeof pricingSaveReqValidator>
