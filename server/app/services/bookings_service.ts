import Booking, { BookingId, BookingPaginateReq, BookingSort, BookingType } from '#models/booking'
import { Paginated } from '../paginate.js'
import { CreateBookingReq, UpdateBookingReq } from '#validators/booking'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import User from '#models/user'
import RoomType from '#models/room_type'
import db from '@adonisjs/lucid/services/db'
import Guest from '#models/guest'
import { ValidationException } from '#exceptions/ValidationException'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'
import Room from '#models/room'
import { PricingsService } from './pricings_service.js'
import { RoomsService } from './rooms_service.js'
import { randomUUID } from 'node:crypto'

@inject()
export class BookingsService {
  constructor(
    private logger: Logger,
    private pricingService: PricingsService,
    private roomService: RoomsService
  ) {}
  // Your code here
  private sortFields: Record<BookingSort, string> = {
    id: 'id',
    checkInDate: 'check_in_date',
  }

  private defaultSort = this.sortFields.checkInDate

  async listPaginate(paginateReq: BookingPaginateReq): Promise<Paginated<Booking>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = Booking.query().preload('roomType').preload('room')

    if (search) {
      if (search.contactName) query.where('contact_name', 'like', `%${search.contactName}%`)
      if (search.contactNumber) query.where('contact_name', 'like', `%${search.contactNumber}%`)
      if (search.email) query.where('email', 'like', `%${search.email}%`)
      if (search.checkInDate) query.where('check_in_date', '=', search.checkInDate.toSQLDate()!!)
      if (search.checkOutDate)
        query.where('check_out_date', '=', search.checkOutDate?.toSQLDate()!!)
      if (search.roomTypeId) query.where('room_type_id', '=', search.roomTypeId)
      if (search.roomTypeName) {
        const subQuery = RoomType.query().where('name', search.roomTypeName).select('id')
        query.whereIn('room_type_id', subQuery)
      }
      if (search.source) query.where('source', '=', search.source)
      if (search.status) query.where('status', '=', search.status)
      if (search.roomCode) {
        const subQuery = Room.query().where('code', 'like', `%${search.roomCode}%`).select('id')
        query.whereIn('room_id', subQuery)
      }
    }

    query.orderBy(sort ? this.sortFields[sort] : this.defaultSort, direction)

    const paginated = await query.paginate(page ?? 1, size)

    return {
      data: paginated.all(),
      total: paginated.total,
      hasNext: paginated.hasMorePages,
    }
  }

  async get(id: BookingId): Promise<Booking> {
    // const roomType = await RoomType.findOrFail(booking.roomTypeId)
    //
    // return {
    //   booking: booking,
    //   roomNameType: roomType.name,
    // }
    //
    const booking = await Booking.query()
      .where('id', id)
      .preload('roomType')
      .preload('guests')
      .preload('room')
      .firstOrFail()

    return booking
  }

  async create(
    req: CreateBookingReq & Partial<Pick<BookingType, 'status' | 'confirmBookingNo'>>,
    user?: User,
    transaction?: TransactionClientContract
  ): Promise<BookingId> {
    const { roomTypeName, ...bookingReq } = req
    const roomType = await RoomType.findByOrFail({ name: roomTypeName })

    // const totalDay = checkOutDate.get('day') - checkInDate.get('day')
    // const maxRoomCount = await Room.query().where('roomTypeId', roomType.id).count('id')
    // const roomTakenCount = await Booking.query()
    //   .withCount('room')
    //   .where('roomTypeId', roomType.id)
    //   .where('checkInDate', '<=', checkInDate.toSQLDate()!)
    //   .where('checkOutDate', '>=', checkOutDate.toSQLDate()!)
    //   .whereNotIn('status', ['NON-CONFIRMED', 'CANCELLED'])
    //
    // const isRoomTypeAvailable = maxRoomCount
    //
    // if (existBooking) throw new ValidationException('Booking is already exist')

    const trx = transaction ? transaction : await db.transaction()

    try {
      const booking = await Booking.create(
        {
          ...bookingReq,
          roomTypeId: roomType.id,
          createdBy: user?.id,
          updatedBy: user?.id,
        },
        { client: trx }
      )

      await trx.commit()
      this.logger.info(`Booking (${booking.id}) is created`)
      return booking.id
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }

  async update(
    id: BookingId,
    req: UpdateBookingReq & Partial<Pick<BookingType, 'status' | 'confirmBookingNo'>>,
    user?: User,
    transaction?: TransactionClientContract
  ): Promise<BookingId> {
    const booking = await Booking.findOrFail(id)
    const { roomTypeName, guests: guestReqs, ...bookingReq } = req

    booking.merge({ ...bookingReq, updatedBy: user?.id })

    if (roomTypeName) {
      const roomType = await RoomType.findByOrFail({ name: roomTypeName })
      booking.merge({ roomTypeId: roomType.id })
    }

    const trx = transaction ? transaction : await db.transaction()

    try {
      if (guestReqs) {
        const guests = await Guest.updateOrCreateMany('citizenId', guestReqs, { client: trx })
        const guestIds = guests.map((guest) => guest.id)
        await booking.related('guests').sync(guestIds, true, trx)
      }
      await booking.useTransaction(trx).save()
      await trx.commit()

      return booking.id
    } catch (err) {
      await trx.rollback()
      throw err
    }
  }

  async delete(id: BookingId): Promise<void> {
    const booking = await Booking.findOrFail(id)
    return booking.delete()
  }

  async checkIn(id: BookingId, req: UpdateBookingReq, user: User): Promise<BookingId> {
    if (!req.guests || req.guests.length === 0)
      throw new ValidationException('Guests cannot be empty')

    if (!req.roomId) throw new ValidationException('Room must be assigned to check-in')

    const booking = await Booking.findOrFail(id)
    const room = await Room.findOrFail(req.roomId)

    if (booking.status !== 'RESERVED')
      throw new ValidationException('Only reserved status bookings that are check-inable')

    if (room.status !== 'AVAILABLE') throw new ValidationException('The room is not yet available')

    // TODO: weird trx management
    const trx = await db.transaction()

    await room.useTransaction(trx).merge({ status: 'OCCUPIED' }).save()
    await this.update(id, { ...req, status: 'CHECKED-IN' }, user, trx)

    return id
  }

  async checkOut(id: BookingId, user: User): Promise<BookingId> {
    const booking = await Booking.query().preload('room').where('id', id).firstOrFail()
    const room = booking.room

    if (booking.status !== 'CHECKED-IN')
      throw new ValidationException('The room is not yet checked-in')

    const trx = await db.transaction()

    // TODO: weird trx management
    await room.useTransaction(trx).merge({ status: 'CLEANING', updatedBy: user.id }).save()
    await this.update(id, { status: 'CHECKED-OUT' }, user, trx)

    return id
  }

  async createOnlineBook(req: CreateBookingReq): Promise<string> {
    const totalPrice = await this.pricingService.getTotalPrice({
      roomTypeName: req.roomTypeName,
      from: req.checkInDate,
      to: req.checkOutDate.minus({ day: 1 }),
    })

    // if (req.roomPrice !== totalPrice)
    //   throw new ValidationException('Price was changed, please try again.')

    const bookingId = await this.create({
      ...req,
      roomPrice: totalPrice,
      status: 'NON-CONFIRMED',
      confirmBookingNo: randomUUID(),
    })

    const newBooking = await Booking.findOrFail(bookingId)
    return newBooking.confirmBookingNo
  }

  async confirmBookByConfirmNo(confirmBookingNo: string): Promise<string> {
    const booking = await Booking.findByOrFail({ confirmBookingNo: confirmBookingNo })

    await this.update(booking.id, { status: 'RESERVED' })
    return confirmBookingNo
  }
}
