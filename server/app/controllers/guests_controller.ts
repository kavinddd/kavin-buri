import type { HttpContext } from '@adonisjs/core/http'

import { GuestsService } from '#services/guests_service'
import { inject } from '@adonisjs/core'
import { DEFAULT_PAGINATE_REQ } from '../paginate.js'
import {
  CreateGuestReq,
  createGuestValidator,
  paginateGuestValidator,
  UpdateGuestReq,
  updateGuestValidator,
} from '#validators/guest'
import GuestPolicy from '#policies/guest_policy'
import { GuestId, GuestPaginateReq } from '#models/guest'
import { idNumberValidator } from '#validators/commons'

@inject()
export default class GuestsController {
  constructor(private service: GuestsService) {}

  async paginate({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(GuestPolicy).denies('list')) {
      return response.forbidden('No access')
    }

    const {
      // params: { size, sort, direction, ...search },
      page,
      size,
      sort,
      direction,
      ...search
    } = await paginateGuestValidator.validate(request.qs())

    const req = {
      ...DEFAULT_PAGINATE_REQ,
      size: size || DEFAULT_PAGINATE_REQ.size,
      sort: sort || DEFAULT_PAGINATE_REQ.sort,
      direction: direction || DEFAULT_PAGINATE_REQ.direction,
      search,
    } as GuestPaginateReq

    return this.service.listPaginate(req)
  }

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(GuestPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)
    return this.service.get(id as GuestId)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(GuestPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: CreateGuestReq = await request.validateUsing(createGuestValidator)
    return this.service.create(req, auth.user!)
  }

  async update({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(GuestPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateGuestReq = await request.validateUsing(updateGuestValidator)

    return this.service.update(id, req, auth.user!)
  }

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(GuestPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as GuestId)
  }
}
