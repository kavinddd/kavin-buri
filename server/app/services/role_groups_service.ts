import RoleGroup, { RoleGroupId, RoleGroupPaginateReq, RoleGroupSort } from '#models/role_group'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import User from '#models/user'
import { CreateRoleGroupReq, UpdateRoleGroupReq } from '#validators/role_group'
import Role from '#models/role'
import RoleGroupRole from '#models/role_group_role'
import db from '@adonisjs/lucid/services/db'

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

    const query = RoleGroup.query().preload('roles')

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.name) query.where('name', 'ilike', `%${search.name}%`)
      if (search.roles) {
        const subQuery = RoleGroupRole.query()
          .join('roles', 'role_group_role.role_id', 'roles.id')
          .whereIn('roles.name', search.roles)
          .select('role_group_role.role_group_id')
        query.whereIn('role_groups.id', subQuery)
      }
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
    return RoleGroup.query().preload('roles').where('id', id).firstOrFail()
  }

  async create(req: CreateRoleGroupReq, user: User): Promise<RoleGroupId> {
    const trx = await db.transaction()

    try {
      const { roles: roleNames, ...roleGroupReq } = req

      const roles = await Role.query().whereIn('name', roleNames)
      const roleIds = roles.map((role) => role.id)

      const roleGroup = await RoleGroup.create(
        {
          ...roleGroupReq,
          createdBy: user.id,
          updatedBy: user.id,
        },
        {
          client: trx,
        }
      )

      await roleGroup.related('roles').attach(roleIds, trx)

      this.logger.info(`Role group (${roleGroup.id}) is created`)

      await trx.commit()
      return roleGroup.id
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  async update(id: RoleGroupId, req: UpdateRoleGroupReq, user: User): Promise<RoleGroupId> {
    const trx = await db.transaction()
    try {
      const { roles: roleNames, ...roleGroupReq } = req
      const roleGroup = await RoleGroup.findOrFail(id)
      roleGroup.useTransaction(trx).merge({ ...roleGroupReq, updatedBy: user.id })

      if (req.roles && req.roles.length > 0) {
        const roles = await Role.query().whereIn('name', req.roles)
        const roleIds = roles.map((role) => role.id)
        await roleGroup.related('roles').sync(roleIds, true, trx)
      }

      await roleGroup.save()
      await trx.commit()

      return roleGroup.id
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  async delete(id: RoleGroupId): Promise<void> {
    const roleGroup = await RoleGroup.findOrFail(id)
    return roleGroup.delete()
  }
}
