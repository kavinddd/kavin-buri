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
import { ValidationException } from '#exceptions/ValidationException'

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

  async createOnlineBooking({ request, response, session }: HttpContext) {
    const req: CreateBookingReq = await request.validateUsing(createBookingValidator)

    console.log(req)

    const confirmBookingNo = await this.service.createOnlineBook(req)

    session.flash('success', 'Booking is made, please confirm your booking')
    response.redirect().toRoute('myBooking.index', { confirmNo: confirmBookingNo })
  }

  async myBooking({ inertia, params, session }: HttpContext) {
    const confirmNo = params.confirmNo

    if (!confirmNo) {
      return inertia.render('MyBookingPage')
    }

    const booking = await Booking.query()
      .preload('roomType')
      .where({ confirmBookingNo: confirmNo })
      .first()

    if (!booking) {
      session.flash('error', 'Booking was not found.')
      return inertia.render('MyBookingPage', { confirmNo })
    }

    return inertia.render('MyBookingPage', { confirmNo, booking })
  }

  async confirm({ session, response, params }: HttpContext) {
    const confirmNo = params.confirmNo
    try {
      await this.service.confirmBookByConfirmNo(confirmNo)
      session.flash('success', 'Confirm your booking succesfully!')
      return response.redirect().toRoute('myBooking.index', { confirmNo })
    } catch (err) {
      if (err instanceof ValidationException) {
        session.flash('error', err.message)
      }
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
