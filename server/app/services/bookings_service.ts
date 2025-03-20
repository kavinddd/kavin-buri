import Booking, { BookingId, BookingPaginateReq, BookingSort, BookingType } from '#models/booking'
import { Paginated } from '../paginate.js'
import { CreateBookingReq, UpdateBookingReq } from '#validators/booking'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import User from '#models/user'
import RoomType from '#models/room_type'
import { RoomTypeNameType } from '../types.js'

interface GetResp {
  booking: BookingType
  roomNameType: RoomTypeNameType
}

@inject()
export class BookingsService {
  constructor(private logger: Logger) {}
  // Your code here
  private sortFields: Record<BookingSort, string> = {
    id: 'id',
    checkInDate: 'check_in_date',
  }

  private defaultSort = this.sortFields.checkInDate

  async listPaginate(paginateReq: BookingPaginateReq): Promise<Paginated<Booking>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = Booking.query()

    console.log(search)

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
    const booking = await Booking.query().where('id', id).preload('roomType').firstOrFail()

    return booking
  }

  async create(req: CreateBookingReq, user: User): Promise<BookingId> {
    const { roomTypeName, ...bookingReq } = req

    const roomType = await RoomType.findByOrFail({ name: roomTypeName })

    const booking = await Booking.create({
      ...bookingReq,
      roomTypeId: roomType.id,
      createdBy: user.id,
      updatedBy: user.id,
    })

    this.logger.info(`Booking (${booking.id}) is created`)
    return booking.id
  }

  async update(id: BookingId, req: UpdateBookingReq, user: User): Promise<BookingId> {
    const booking = await Booking.findOrFail(id)
    const { roomTypeName, ...bookingReq } = req
    const roomType = await RoomType.findByOrFail({ name: roomTypeName })
    booking.merge({ ...bookingReq, roomTypeId: roomType.id, updatedBy: user.id })
    await booking.save()
    return booking.id
  }

  async delete(id: BookingId): Promise<void> {
    const booking = await Booking.findOrFail(id)
    return booking.delete()
  }
}
