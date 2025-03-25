import BookingPolicy from '#policies/booking_policy'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

import {
  PricingGetReq,
  pricingGetValidator,
  PricingSaveReq,
  pricingSaveReqValidator,
} from '#validators/pricing'
import { PricingsService } from '#services/pricings_service'

@inject()
export default class PricingsController {
  constructor(private service: PricingsService) {}

  //region inertia
  //
  //endregion

  //region api

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const req: PricingGetReq = await pricingGetValidator.validate(request.qs())

    return this.service.get(req)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(BookingPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: PricingSaveReq = await request.validateUsing(pricingSaveReqValidator)

    return this.service.create(req, auth.getUserOrFail())
  }

  //endregion
}
