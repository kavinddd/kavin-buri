import RoomType from '#models/room_type'
import RoomTypePrice, { RoomTypePriceType } from '#models/room_type_price'
import User from '#models/user'
import { PricingGetReq, PricingSaveReq } from '#validators/pricing'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import { RoomTypeNameType } from '../types.js'

@inject()
export class PricingsService {
  constructor(private logger: Logger) {}

  async get(req: PricingGetReq): Promise<RoomTypePrice[]> {
    const { roomTypeName, year, month } = req

    const roomType = await RoomType.findByOrFail({ name: roomTypeName })

    const start = DateTime.local(year, month, 1).startOf('month')
    const end = DateTime.local(year, month, 1).endOf('month')

    const roomTypePrices = await RoomTypePrice.query()
      .where('room_type_id', roomType.id)
      .whereBetween('date', [`${start}`, `${end}`])

    return roomTypePrices
  }

  async create(req: PricingSaveReq, user: User) {
    const { year, month, roomTypeName, roomPrices } = req

    const roomType = await RoomType.findByOrFail({ name: roomTypeName })

    const roomTypePrices: Partial<RoomTypePriceType>[] = roomPrices.map((roomPrice) => ({
      date: DateTime.local(year, month, roomPrice.day),
      roomTypeId: roomType.id,
      price: roomPrice.price,
      createdBy: user.id,
      updatedBy: user.id,
    }))

    const trx = await db.transaction()

    try {
      const newRoomTypePrices = await RoomTypePrice.updateOrCreateMany(
        ['date', 'roomTypeId', 'price'],
        roomTypePrices,
        {
          client: trx,
        }
      )

      await trx.commit()
      return newRoomTypePrices.map((it) => it.id)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async getTotalPrice({
    from,
    to,
    roomTypeName,
  }: {
    from: DateTime
    to: DateTime
    roomTypeName: RoomTypeNameType
  }): Promise<number> {
    const roomType = await RoomType.findByOrFail('name', roomTypeName)

    const roomTypePrices = await RoomTypePrice.query()
      .where('room_type_id', roomType.id)
      .whereBetween('date', [`${from}`, `${to}`])

    return roomTypePrices.reduce((prev, roomTypePrice) => prev + roomTypePrice.price, 0)
  }

  async listPriceByRoomType({
    from,
    to,
  }: {
    from: DateTime
    to: DateTime
  }): Promise<PriceCalendarByRoomType> {
    const roomTypePrices = await RoomTypePrice.query()
      .preload('roomType')
      .whereBetween('date', [`${from}`, `${to}`])

    const result: PriceCalendarByRoomType = {
      SUPERIOR_DOUBLE: {},
      SUPERIOR_TWIN: {},
      SUITE: {},
      DELUXE: {},
    }

    roomTypePrices.forEach((it) => {
      const year = it.date.year
      const month = it.date.month
      const day = it.date.day
      const price = it.price
      const roomTypeName = it.roomType.name

      if (!(year in result[roomTypeName])) result[roomTypeName][year] = {}

      // Initialize month if not present
      if (!(month in result[roomTypeName][year])) result[roomTypeName][year][month] = {}

      // Set the price for the day

      result[roomTypeName][year][month][day] = price
    })

    return result
  }
}

type Year = number
type Month = number
type Day = number
type RoomPrice = number
export type PriceCalendar = Record<Year, Record<Month, Record<Day, RoomPrice>>>
export type PriceCalendarByRoomType = Record<RoomTypeNameType, PriceCalendar>
