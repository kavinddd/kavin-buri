import { BookingId, BookingPaginateReq } from '#models/booking'
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

@inject()
export default class BookingsController {
  constructor(private service: BookingsService) {}

  //region inertia
  //
  async list() {
    return
  }
  async store({ inertia }: HttpContext) {
    return inertia.render('BookingPage')
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

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as BookingId)
  }

  //endregion
}
