import BookingPolicy from '#policies/booking_policy'
import { BookingsService } from '#services/bookings_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class BookingsController {
  constructor(public service: BookingsService) {}

  //region inertia
  //
  async list() {
    return
  }
  async store({ request, response, inertia }: HttpContext) {
    return inertia.render('BookingPage')
  }

  //endregion

  //region api

  async paginate({ request, bouncer, response }: HttpContext) {
    const test = bouncer.with(BookingPolicy)
    if (await bouncer.with(BookingPolicy).denies('list')) {
      return response.forbidden('No access')
    }
    return []
  }

  async create(ctx: HttpContext) {
    return 11
  }

  async update(ctx: HttpContext) {
    return 11
  }

  async delete(ctx: HttpContext) {
    return 11
  }

  //endregion
}
