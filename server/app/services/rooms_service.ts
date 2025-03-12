import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated } from '../paginate.js'
import Room, { RoomId, RoomPaginateReq, RoomSort } from '#models/room'
import { CreateRoomReq, UpdateRoomReq } from '#validators/room'
import User from '#models/user'

@inject()
export class RoomsService {
  constructor(private logger: Logger) {}

  private sortFields: Record<RoomSort, string> = {
    id: 'id',
    floorNo: 'floor_no',
    maxAdult: 'max_adult',
    updatedBy: 'updated_by',
    updatedAt: 'updated_at',
  }

  private defaultSort = this.sortFields.updatedAt

  async listPaginate(paginateReq: RoomPaginateReq): Promise<Paginated<Room>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = Room.query()

    if (search) {
      if (search.id) query.where('id', '=', search.id)
      if (search.code) query.where('code', 'ilike', `%${search.code}%`)
      if (search.roomType) query.where('room_type', '=', search.roomType)
      if (search.maxAdult) query.where('max_adult', '=', search.maxAdult)
    }

    query.orderBy(sort ? this.sortFields[sort] : this.defaultSort, direction)

    const paginated = await query.paginate(page ?? 1, size)

    return {
      data: paginated.all(),
      total: paginated.total,
      hasNext: paginated.hasMorePages,
    }
  }

  async get(id: RoomId): Promise<Room> {
    return Room.findOrFail(id)
  }

  async create(req: CreateRoomReq, user: User): Promise<RoomId> {
    console.log(user)
    const room = await Room.create({ ...req, updatedBy: user.id })

    this.logger.info(`Room (${room.id}) is created`)
    return room.id
  }

  async update(id: RoomId, req: UpdateRoomReq, user: User): Promise<RoomId> {
    const room = await Room.findOrFail(id)
    room.merge({ ...req, updatedBy: user.id })
    await room.save()
    return room.id
  }

  async delete(id: RoomId): Promise<void> {
    const room = await Room.findOrFail(id)
    return room.delete()
  }
}
