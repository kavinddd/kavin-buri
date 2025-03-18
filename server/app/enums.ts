import { SortDirectionType } from './paginate.js'
import {
  BookingSourceType,
  BookingStatusType,
  ReservationType,
  RoleNameType,
  RoomStatusType,
  RoomType,
} from './types.js'

export const roleNameEnum: RoleNameType[] = [
  'ADMIN',
  'READ_BOOKING',
  'EDIT_BOOKING',
  'READ_ROOM',
  'EDIT_ROOM',
  'READ_ROLE_GROUP',
  'EDIT_ROLE_GROUP',
]

export const roomTypeEnum: RoomType[] = ['SUPERIOR_TWIN', 'SUPERIOR_DOUBLE', 'DELUXE', 'SUITE']

export const roomStatusEnum: RoomStatusType[] = [
  'OUT_OF_SERVICE',
  'OCCUPIED',
  'AVAILABLE',
  'RESERVED',
]

// export const reservationEnum: ReservationType[] = [
//   'NON-GUARANTEED',
//   'DEPOSIT-RECEIVED',
//   'GUARANTEED',
// ]

export const bookingStatusEnum: BookingStatusType[] = [
  'RESERVED',
  'CHECKED-IN',
  'CHECKED-OUT',
  'NO-SHOW',
  'CANCELLED',
]

export const bookingSourceEnum: BookingSourceType[] = ['WALK-IN', 'PHONE', 'WEBSITE', 'OTHERS']

export const directionEnum: SortDirectionType[] = ['asc', 'desc']
