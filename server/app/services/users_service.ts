import User, { UserId, UserPaginateReq, UserSort } from '#models/user'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import { CreateUserReq, UpdateUserReq } from '#validators/user'

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

    const query = User.query()

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.fullName) query.where('code', 'ilike', `%${search.fullName}%`)
      if (search.username) query.where('username', 'ilike', `%${search.username}%`)
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
    return User.findOrFail(id)
  }

  async create(req: CreateUserReq, user: User): Promise<UserId> {
    console.log(user)
    const room = await User.create({ ...req, createdBy: user.id, updatedBy: user.id })

    this.logger.info(`User (${room.id}) is created`)
    return room.id
  }

  async update(id: UserId, req: UpdateUserReq, user: User): Promise<UserId> {
    const room = await User.findOrFail(id)
    room.merge({ ...req, updatedBy: user.id })
    await room.save()
    return room.id
  }

  async delete(id: UserId): Promise<void> {
    const room = await User.findOrFail(id)
    return room.delete()
  }
}
