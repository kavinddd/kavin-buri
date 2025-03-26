import User, { UserId, UserPaginateReq, UserSort } from '#models/user'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import { CreateUserReq, UpdateUserReq } from '#validators/user'
import db from '@adonisjs/lucid/services/db'
import RoleGroupRole from '#models/role_group_role'
import UserRoleGroup from '#models/user_role_group'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'

@inject()
export class UserService {
  constructor(private logger: Logger) {}

  private sortFields: Record<UserSort, string> = {
    id: 'id',
    fullName: 'full_name',
    username: 'username',
    updatedAt: 'updated_at',
  }

  private defaultSort = this.sortFields.updatedAt

  async listPaginate(paginateReq: UserPaginateReq): Promise<Paginated<User>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = User.query().preload('roleGroups')

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.fullName) query.where('full_name', 'ilike', `%${search.fullName}%`)
      if (search.username) query.where('username', 'ilike', `%${search.username}%`)
      if (search.isActive !== undefined) query.where('is_active', '=', `${search.isActive}`)
      if (search.roleGroupIds) {
        const subQuery = UserRoleGroup.query()
          .whereIn('role_group_id', search.roleGroupIds)
          .select('user_id')
        query.whereIn('id', subQuery)
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

  async get(id: UserId): Promise<User> {
    return User.query().preload('roleGroups').where('id', id).firstOrFail()
  }

  async create(req: CreateUserReq, currentUser: User): Promise<UserId> {
    const { roleGroupIds, ...userReq } = req

    const trx = await db.transaction()

    try {
      const user = await User.create(
        {
          ...userReq,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        },
        { client: trx }
      )

      if (roleGroupIds) await user.related('roleGroups').attach(roleGroupIds, trx)

      await trx.commit()

      this.logger.info(`User (${user.id}) is created`)
      return user.id
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  async update(
    id: UserId,
    req: UpdateUserReq,
    currentUser: User,
    auth: Authenticator<Authenticators>
  ): Promise<UserId> {
    const { roleGroupIds, ...userReq } = req
    const trx = await db.transaction()

    try {
      const user = await User.findOrFail(id)

      user.useTransaction(trx)

      user.merge({ ...userReq, updatedBy: currentUser.id })

      if (roleGroupIds !== undefined) {
        user.related('roleGroups').sync(roleGroupIds, true, trx)
      }

      await user.save()
      await trx.commit()

      // updating the user will ensure the updated one is will be logged out
      await auth.use('web').logout()

      return user.id
    } catch (e) {
      await trx.rollback()
      throw e
    }
  }

  async delete(id: UserId): Promise<void> {
    const room = await User.findOrFail(id)
    return room.delete()
  }
}
