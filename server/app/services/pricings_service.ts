import RoomType from '#models/room_type'
import RoomTypePrice, { RoomTypePriceType } from '#models/room_type_price'
import User from '#models/user'
import { PricingGetReq, PricingSaveReq } from '#validators/pricing'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

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
    }))

    const oldRoomTypePrices = await this.get({ roomTypeName, year, month })
    const oldRoomTypePriceIds = oldRoomTypePrices.map((it) => it.id)

    const trx = await db.transaction()

    try {
      // delete first
      await RoomTypePrice.query({ client: trx }).whereIn('id', oldRoomTypePriceIds).delete()
      // then insert to keep records in sync
      const newRoomTypePrices = await RoomTypePrice.createMany(roomTypePrices, { client: trx })

      await trx.commit()
      return newRoomTypePrices.map((it) => it.id)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
