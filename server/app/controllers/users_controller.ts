import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATE_REQ } from '../paginate.js'
import {
  CreateUserReq,
  createUserValidator,
  paginateUserValidator,
  UpdateUserReq,
  updateUserValidator,
} from '#validators/user'
import UserPolicy from '#policies/room_policy'
import { UserId, UserPaginateReq } from '#models/user'
import { inject } from '@adonisjs/core'
import { UserService } from '#services/users_service'
import { idNumberValidator } from '#validators/commons'

@inject()
export default class UsersController {
  constructor(private service: UserService) {}

  async paginate({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('list')) {
      return response.forbidden('No access')
    }

    const {
      // params: { size, sort, direction, ...search },
      page,
      size,
      sort,
      direction,
      ...search
    } = await paginateUserValidator.validate(request.qs())

    const req = {
      ...DEFAULT_PAGINATE_REQ,
      page: page || 1,
      size: size || DEFAULT_PAGINATE_REQ.size,
      sort: sort || DEFAULT_PAGINATE_REQ.sort,
      direction: direction || DEFAULT_PAGINATE_REQ.direction,
      search,
    } as UserPaginateReq

    return this.service.listPaginate(req)
  }

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)
    return this.service.get(id as UserId)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: CreateUserReq = await request.validateUsing(createUserValidator)
    return this.service.create(req, auth.user!)
  }

  async update({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateUserReq = await request.validateUsing(updateUserValidator)

    return this.service.update(id, req, auth.user!)
  }

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as UserId)
  }
}
