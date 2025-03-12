import Guest, { GuestId, GuestPaginateReq, GuestSort } from '#models/guest'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import { CreateGuestReq, UpdateGuestReq } from '#validators/guest'
import User from '#models/user'

@inject()
export class GuestsService {
  constructor(private logger: Logger) {}
  // Your code here
  private sortFields: Record<GuestSort, string> = {
    updatedAt: 'updated_at',
    dateOfBirth: 'date_of_birth',
    nationality: 'nationality',
  }
  private defaultSort = this.sortFields.updatedAt

  async listPaginate(paginateReq: GuestPaginateReq): Promise<Paginated<Guest>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = Guest.query()

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.citizenId) query.where('citizenId', 'like', `%${search.citizenId}%`)
      if (search.firstName) query.where('firstName', 'like', `%${search.firstName}%`)
      if (search.lastName) query.where('firstName', 'like', `%${search.lastName}%`)
      if (search.dateOfBirth) query.where('date_of_birth', '=', search.dateOfBirth?.toJSDate())
      if (search.nationality) query.where('nationality', 'like', `%${search.nationality}%`)
    }

    query.orderBy(sort ? this.sortFields[sort] : this.defaultSort, direction)

    const paginated = await query.paginate(page ?? 1, size)

    return {
      data: paginated.all(),
      total: paginated.total,
      hasNext: paginated.hasMorePages,
    }
  }

  async get(id: GuestId): Promise<Guest> {
    return Guest.findOrFail(id)
  }

  async create(req: CreateGuestReq, user: User): Promise<GuestId> {
    const guest = await Guest.create({ ...req, createdBy: user.id, updatedBy: user.id })
    this.logger.info(`Guest (${guest.id}) is created`)
    return guest.id
  }

  async update(id: GuestId, req: UpdateGuestReq, user: User): Promise<GuestId> {
    const guest = await Guest.findOrFail(id)
    guest.merge({ ...req, updatedBy: user.id })
    await guest.save()
    return guest.id
  }

  async delete(id: GuestId): Promise<void> {
    const guest = await Guest.findOrFail(id)
    return guest.delete()
  }
}
