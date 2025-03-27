import Booking, { BookingId, BookingPaginateReq } from '#models/booking'
import BookingPolicy from '#policies/booking_policy'
import { BookingsService } from '#services/bookings_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATE_REQ } from '../paginate.js'
import {
  type CreateBookingReq,
  createBookingValidator,
  paginateBookingValidator,
  UpdateBookingReq,
  updateBookingValidator,
} from '#validators/booking'

import { idNumberValidator } from '#validators/commons'
import { PriceCalendarByRoomType, PricingsService } from '#services/pricings_service'
import { DateTime } from 'luxon'
import { PageProps } from '@adonisjs/inertia/types'

export interface BookingIndexProps extends PageProps {
  priceCalendarByRoomType: PriceCalendarByRoomType
}

@inject()
export default class BookingsController {
  constructor(
    private service: BookingsService,
    private pricingsService: PricingsService
  ) {}

  //region inertia
  //
  async index({ inertia }: HttpContext) {
    const priceCalendarByRoomType = await this.pricingsService.listPriceByRoomType({
      from: DateTime.now(),
      to: DateTime.now().plus({ months: 6 }),
    })

    return inertia.render('BookingPage', {
      priceCalendarByRoomType,
    } as BookingIndexProps)
  }

  async createOnlineBooking({ request, response }: HttpContext) {
    try {
      const req: CreateBookingReq = await request.validateUsing(createBookingValidator)

      const confirmBookingNo = await this.service.createOnlineBook(req)

      console.log('confirm booking no :', confirmBookingNo)
      response.redirect().toRoute('myBooking.index', { confirmNo: confirmBookingNo })
      console.log('redirected')
    } catch (err) {
      console.log(err)
      response.redirect().toRoute('booking.index')
    }
  }

  async myBooking({ inertia, params }: HttpContext) {
    const confirmNo = params.confirmNo

    if (!confirmNo) {
      return inertia.render('MyBookingPage')
    }

    const booking = await Booking.findBy({ confirmBookingNo: confirmNo })

    if (!booking)
      return inertia.render('MyBookingPage', {
        errors: [`Confirm No (${confirmNo}) doesn't exist`],
      })

    return inertia.render('MyBookingPage', { booking })
  }

  async confirm({ inertia, response, params }: HttpContext) {
    const confirmNo = params.confirmNo
    try {
      this.service.confirmBookByConfirmNo(confirmNo)

      const booking = await Booking.findBy({ bookingConfirmNo: confirmNo })

      return inertia.render('MyBookingPage', { booking })
    } catch (err) {
      response.redirect().toRoute('myBooking.index', { errors: err })
    }
  }

  //endregion

  //region api

  async paginate({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('list')) {
      return response.forbidden('No access')
    }

    const {
      // params: { size, sort, direction, ...search },
      page,
      size,
      sort,
      direction,
      ...search
    } = await paginateBookingValidator.validate(request.qs())

    const req = {
      ...DEFAULT_PAGINATE_REQ,
      page: page || 1,
      size: size || DEFAULT_PAGINATE_REQ.size,
      sort: sort || DEFAULT_PAGINATE_REQ.sort,
      direction: direction || DEFAULT_PAGINATE_REQ.direction,
      search,
    } as BookingPaginateReq

    return this.service.listPaginate(req)
  }

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)
    return this.service.get(id as BookingId)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: CreateBookingReq = await request.validateUsing(createBookingValidator)

    return this.service.create(req, auth.getUserOrFail())
  }

  async update({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateBookingReq = await request.validateUsing(updateBookingValidator)

    return this.service.update(id, req, auth.getUserOrFail())
  }

  async checkIn({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateBookingReq = await request.validateUsing(updateBookingValidator)

    return this.service.checkIn(id, req, auth.getUserOrFail())
  }

  async checkOut({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    return this.service.checkOut(id, auth.getUserOrFail())
  }

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as BookingId)
  }

  //endregion
}
