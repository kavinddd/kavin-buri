import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import { Paginated, SortDirectionType } from '../paginate.js'
import Room, { RoomId, RoomPaginateReq, RoomSearch, RoomSort } from '#models/room'
import { CreateRoomReq, UpdateRoomReq } from '#validators/room'
import User from '#models/user'
import RoomType from '#models/room_type'
import { ListDropdown } from '../dropdown.js'
import { RoleGroupId } from '#models/role_group'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

@inject()
export class RoomsService {
  constructor(private logger: Logger) {}

  private sortFields: Record<RoomSort, string> = {
    id: 'id',
    code: 'code',
    floorNo: 'floor_no',
    updatedBy: 'updated_by',
    updatedAt: 'updated_at',
  }

  private defaultSort = this.sortFields.code
  private defaultSortDirection: SortDirectionType = 'asc'

  private querySearch(query: ModelQueryBuilderContract<typeof Room, Room>, search: RoomSearch) {
    if (search.id) query.where('id', '=', search.id)
    if (search.floorNo) query.where('floor_no', '=', search.floorNo)
    if (search.code) query.where('code', 'ilike', `%${search.code}%`)
    if (search.roomTypeName) {
      const subQuery = RoomType.query().where('name', search.roomTypeName).select('id')
      query.whereIn('room_type_id', subQuery)
    }

    if (search.roomTypeId) query.where('room_type_id', '=', search.roomTypeId)
  }

  async listPaginate(paginateReq: RoomPaginateReq): Promise<Paginated<Room>> {
    const { page, size, sort, search, direction } = paginateReq

    const query = Room.query().preload('roomType')

    if (search) {
      this.querySearch(query, search)
    }

    query.orderBy(
      sort ? this.sortFields[sort] : this.defaultSort,
      direction || this.defaultSortDirection
    )

    const paginated = await query.paginate(page ?? 1, size)

    return {
      data: paginated.all(),
      total: paginated.total,
      hasNext: paginated.hasMorePages,
    }
  }

  async get(id: RoomId): Promise<Room> {
    return Room.query().preload('roomType').where('id', id).firstOrFail()
  }

  async create(req: CreateRoomReq, user: User): Promise<RoomId> {
    console.log(user)
    const room = await Room.create({ ...req, updatedBy: user.id })

    this.logger.info(`Room (${room.id}) is created`)
    return room.id
  }

  async update(id: RoomId, req: UpdateRoomReq, user: User): Promise<RoomId> {
    const { roomTypeName, ...roomReq } = req

    const roomType = await RoomType.findByOrFail('name', roomTypeName)

    const room = await Room.findOrFail(id)
    room.merge({ ...roomReq, roomTypeId: roomType.id, updatedBy: user.id })
    await room.save()
    return room.id
  }

  async delete(id: RoomId): Promise<void> {
    const room = await Room.findOrFail(id)
    return room.delete()
  }

  async listDropdown(
    q: string | undefined,
    search: RoomSearch
  ): Promise<ListDropdown<RoleGroupId>> {
    const query = Room.query()
    if (q) query.where('code', 'ilike', `%${q}%`)

    if (search) {
      this.querySearch(query, search)
    }

    const rooms = await query

    return {
      data: rooms.map((room) => ({
        id: room.id,
        label: room.code,
      })),
    }
  }
}
