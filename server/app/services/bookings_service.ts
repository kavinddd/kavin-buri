import Booking, { BookingId, BookingPaginateReq, BookingSort } from '#models/booking'
import { Paginated } from '../paginate.js'
import { CreateBookingReq, UpdateBookingReq } from '#validators/booking'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import User from '#models/user'

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

    if (search) {
      if (search.email) query.where('email', 'like', `%${search.email}%`)
      if (search.checkInDate) query.where('check_in_date', '=', search.checkInDate.toSQLDate()!!)
      if (search.checkOutDate)
        query.where('check_out_date', '=', search.checkOutDate?.toSQLDate()!!)
      if (search.roomTypeId) query.where('room_type_id', '=', search.roomTypeId)
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
    return Booking.findOrFail(id)
  }

  async create(req: CreateBookingReq, user: User): Promise<BookingId> {
    const booking = await Booking.create({
      ...req,
      createdBy: user.id,
      updatedBy: user.id,
    })

    this.logger.info(`Booking (${booking.id}) is created`)
    return booking.id
  }

  async update(id: BookingId, req: UpdateBookingReq, user: User): Promise<BookingId> {
    const booking = await Booking.findOrFail(id)
    booking.merge({ ...req, updatedBy: user.id })
    await booking.save()
    return booking.id
  }

  async delete(id: BookingId): Promise<void> {
    const booking = await Booking.findOrFail(id)
    return booking.delete()
  }
}
