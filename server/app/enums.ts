import { SortDirectionType } from './paginate.js'
import {
  BookingSourceType,
  BookingStatusType,
  ReservationType,
  RoleNameType,
  RoomStatusType,
  RoomTypeNameType,
} from './types.js'

export const roleNameEnum: RoleNameType[] = [
  'ADMIN',
  'READ_BOOKING',
  'EDIT_BOOKING',
  'READ_ROOM',
  'EDIT_ROOM',
  'READ_ROLE_GROUP',
  'EDIT_ROLE_GROUP',
  'READ_GUEST',
  'EDIT_GUEST',
  'READ_USER',
  'EDIT_USER',
  'READ_PRICING',
  'EDIT_PRICING',
]

export const roomTypeNameEnum: RoomTypeNameType[] = [
  'SUPERIOR_TWIN',
  'SUPERIOR_DOUBLE',
  'DELUXE',
  'SUITE',
]

export const roomStatusEnum: RoomStatusType[] = [
  'OUT_OF_SERVICE',
  'OCCUPIED',
  'AVAILABLE',
  'RESERVED',
  'CLEANING',
]

// export const reservationEnum: ReservationType[] = [
//   'NON-GUARANTEED',
//   'DEPOSIT-RECEIVED',
//   'GUARANTEED',
// ]

export const bookingStatusEnum: BookingStatusType[] = [
  'NON-CONFIRMED',
  'RESERVED',
  'CHECKED-IN',
  'CHECKED-OUT',
  'NO-SHOW',
  'CANCELLED',
]

export const bookingSourceEnum: BookingSourceType[] = ['WALK-IN', 'PHONE', 'WEBSITE', 'OTHERS']

export const directionEnum: SortDirectionType[] = ['asc', 'desc']
