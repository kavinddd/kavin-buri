import RoleGroupPolicy from '#policies/role_group_policy'
import {
  CreateRoleGroupReq,
  createRoleGroupValidator,
  paginateRoleGroupValidator,
  UpdateRoleGroupReq,
  updateRoleGroupValidator,
} from '#validators/role_group'
import type { HttpContext } from '@adonisjs/core/http'
import { DEFAULT_PAGINATE_REQ } from '../paginate.js'
import { inject } from '@adonisjs/core'
import { RoleGroupId, RoleGroupPaginateReq } from '#models/role_group'
import { RoleGroupsService } from '#services/role_groups_service'
import { idNumberValidator } from '#validators/commons'

@inject()
export default class RoleGroupsController {
  constructor(private service: RoleGroupsService) {}

  async paginate({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoleGroupPolicy).denies('list')) {
      return response.forbidden('No access')
    }

    const {
      // params: { size, sort, direction, ...search },
      page,
      size,
      sort,
      direction,
      ...search
    } = await paginateRoleGroupValidator.validate(request.qs())

    const req = {
      ...DEFAULT_PAGINATE_REQ,
      size: size || DEFAULT_PAGINATE_REQ.size,
      sort: sort || DEFAULT_PAGINATE_REQ.sort,
      direction: direction || DEFAULT_PAGINATE_REQ.direction,
      search,
    } as RoleGroupPaginateReq

    return this.service.listPaginate(req)
  }

  async get({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoleGroupPolicy).denies('get')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)
    return this.service.get(id as RoleGroupId)
  }

  async create({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(RoleGroupPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const req: CreateRoleGroupReq = await request.validateUsing(createRoleGroupValidator)
    return this.service.create(req, auth.user!)
  }

  async update({ request, bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(RoleGroupPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const {
      params: { id },
    } = await request.validateUsing(idNumberValidator)

    const req: UpdateRoleGroupReq = await request.validateUsing(updateRoleGroupValidator)

    return this.service.update(id, req, auth.user!)
  }

  async delete({ params, bouncer, response }: HttpContext) {
    if (await bouncer.with(RoleGroupPolicy).denies('create')) {
      return response.forbidden('No access')
    }

    const { id } = params
    return this.service.delete(id as RoleGroupId)
  }
}
