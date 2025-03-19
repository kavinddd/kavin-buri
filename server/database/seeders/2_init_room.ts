import Role from '#models/role'
import RoleGroup from '#models/role_group'
import Room from '#models/room'
import RoomType, { RoomTypeId } from '#models/room_type'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import type { RoomTypeNameType } from '../../app/types.js'

const seedRoomTypes: Partial<RoomType>[] = [
  {
    name: 'SUPERIOR_TWIN',
    areaSqMeter: 26,
    maxAdult: 2,
    maxChildren: 2,
  },
  {
    name: 'SUPERIOR_DOUBLE',
    areaSqMeter: 28,
    maxAdult: 2,
    maxChildren: 2,
  },
  {
    name: 'DELUXE',
    areaSqMeter: 36,
    maxAdult: 2,
    maxChildren: 2,
  },
  {
    name: 'SUITE',
    areaSqMeter: 52,
    maxAdult: 4,
    maxChildren: 4,
  },
]

// status is default to AVAILABLE
const seedRooms: Partial<
  Room & {
    roomTypeName: RoomTypeNameType
  }
>[] = [
  {
    code: '201',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 2,
  },
  {
    code: '202',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 2,
  },
  {
    code: '203',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 2,
  },
  {
    code: '204',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 2,
  },
  {
    code: '205',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },

  {
    code: '206',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },

  {
    code: '207',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },

  {
    code: '208',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },

  {
    code: '209',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },

  {
    code: '210',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },
  {
    code: '211',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },
  {
    code: '212',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },
  {
    code: '213',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 2,
  },
  {
    code: '214',
    roomTypeName: 'DELUXE',
    floorNo: 2,
  },
  {
    code: '301',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 3,
  },
  {
    code: '302',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 3,
  },
  {
    code: '303',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 3,
  },
  {
    code: '304',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 3,
  },
  {
    code: '305',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '306',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '307',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '308',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '309',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '310',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '311',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '312',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '313',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 3,
  },
  {
    code: '314',
    roomTypeName: 'DELUXE',
    floorNo: 3,
  },
  {
    code: '401',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 4,
  },
  {
    code: '402',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 4,
  },
  {
    code: '403',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 4,
  },
  {
    code: '404',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 4,
  },
  {
    code: '405',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '406',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '407',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '408',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '409',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '410',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '411',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '412',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '413',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 4,
  },
  {
    code: '414',
    roomTypeName: 'DELUXE',
    floorNo: 4,
  },
  {
    code: '501',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 5,
  },
  {
    code: '502',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 5,
  },
  {
    code: '504',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 5,
  },
  {
    code: '505',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '506',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '507',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '508',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '509',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '510',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '511',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '512',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '513',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 5,
  },
  {
    code: '514',
    roomTypeName: 'DELUXE',
    floorNo: 5,
  },
  {
    code: '601',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 6,
  },
  {
    code: '602',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 6,
  },
  {
    code: '604',
    roomTypeName: 'SUPERIOR_TWIN',
    floorNo: 6,
  },
  {
    code: '605',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '606',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '607',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '608',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '609',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '610',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '611',
    roomTypeName: 'SUPERIOR_DOUBLE',
    floorNo: 6,
  },
  {
    code: '612',
    roomTypeName: 'SUITE',
    floorNo: 6,
  },
  {
    code: '613',
    roomTypeName: 'DELUXE',
    floorNo: 6,
  },
]

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()

    try {
      const roomTypes = await RoomType.createMany(seedRoomTypes, { client: trx })

      const roomTypeIdMapByName = roomTypes.reduce(
        (prev, curr) => {
          prev[curr.name] = curr.id
          return prev
        },
        {} as Record<RoomTypeNameType, RoomTypeId>
      )

      const seedRoomsActual: Partial<Room>[] = seedRooms.map((it) => ({
        ...it,
        roomTypeId: roomTypeIdMapByName[it.roomTypeName!!],
      }))

      seedRoomsActual.forEach((it) => {
        delete it.roomTypeName
      })

      const rooms = await Room.createMany(seedRoomsActual, { client: trx })

      await trx.commit()

      //endregion
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
