import RoleGroup, { RoleGroupId, RoleGroupPaginateReq, RoleGroupSort } from '#models/role_group'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import User from '#models/user'
import { CreateRoleGroupReq, UpdateRoleGroupReq } from '#validators/role_group'

@inject()
export class RoleGroupsService {
  constructor(private logger: Logger) {}

  private sortFields: Record<RoleGroupSort, string> = {
    id: 'id',
    updatedAt: 'updated_at',
  }

  private defaultSort = this.sortFields.updatedAt

  async listPaginate(paginateReq: RoleGroupPaginateReq): Promise<Paginated<RoleGroup>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = RoleGroup.query()

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.name) query.where('name', 'ilike', `%${search.name}%`)
    }

    query.orderBy(sort ? this.sortFields[sort] : this.defaultSort, direction)

    const paginated = await query.paginate(page ?? 1, size)

    return {
      data: paginated.all(),
      total: paginated.total,
      hasNext: paginated.hasMorePages,
    }
  }

  async get(id: RoleGroupId): Promise<RoleGroup> {
    return RoleGroup.findOrFail(id)
  }

  async create(req: CreateRoleGroupReq, user: User): Promise<RoleGroupId> {
    console.log(user)
    const roleGroup = await RoleGroup.create({ ...req, createdBy: user.id, updatedBy: user.id })

    this.logger.info(`Role group (${roleGroup.id}) is created`)
    return roleGroup.id
  }

  async update(id: RoleGroupId, req: UpdateRoleGroupReq, user: User): Promise<RoleGroupId> {
    const roleGroup = await RoleGroup.findOrFail(id)
    roleGroup.merge({ ...req, updatedBy: user.id })
    await roleGroup.save()
    return roleGroup.id
  }

  async delete(id: RoleGroupId): Promise<void> {
    const roleGroup = await RoleGroup.findOrFail(id)
    return roleGroup.delete()
  }
}
