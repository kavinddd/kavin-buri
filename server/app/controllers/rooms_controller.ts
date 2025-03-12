import RoomPolicy from '#policies/room_policy'
import { RoomsService } from '#services/rooms_service'
import {
  CreateRoomReq,
  createRoomValidator,
  paginateRoomValidator,
  UpdateRoomReq,
  updateRoomValidator,
} from '#validators/room'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID, UUID } from 'node:crypto'
import { DEFAULT_PAGINATE_REQ } from '../paginate.js'
import { RoomId, RoomPaginateReq } from '#models/room'
import { idNumberValidator } from '#validators/commons'

@inject()
export default class RoomsController {
  constructor(private service: RoomsService) {}

  async paginate({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoomPolicy).denies('list')) {
      return response.forbidden('No access')
    }

    const {
      // params: { size, sort, direction, ...search },
      page,
      size,
      sort,
      direction,
      ...search
    } = await paginateRoomValidator.validate(request.qs())

    const req = {
      ...DEFAULT_PAGINATE_REQ,
      size: size || DEFAULT_PAGINATE_REQ.size,
      sort: sort || DEFAULT_PAGINATE_REQ.sort,
      direction: direction || DEFAULT_PAGINATE_REQ.direction,
      search,
    } as RoomPaginateReq

    return this.service.listPaginate(req)
  }

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoomPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)
    return this.service.get(id as RoomId)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(RoomPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: CreateRoomReq = await request.validateUsing(createRoomValidator)
    return this.service.create(req, auth.user!)
  }

  async update({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(RoomPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateRoomReq = await request.validateUsing(updateRoomValidator)

    return this.service.update(id, req, auth.user!)
  }

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoomPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as RoomId)
  }
}
