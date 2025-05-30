export type RoleNameType =
  | 'ADMIN'
  | 'READ_BOOKING'
  | 'EDIT_BOOKING'
  | 'READ_ROOM'
  | 'EDIT_ROOM'
  | 'READ_ROLE_GROUP'
  | 'EDIT_ROLE_GROUP'
  | 'READ_GUEST'
  | 'EDIT_GUEST'
  | 'READ_USER'
  | 'EDIT_USER'
  | 'READ_PRICING'
  | 'EDIT_PRICING'

export type RoomTypeNameType = 'SUPERIOR_TWIN' | 'SUPERIOR_DOUBLE' | 'DELUXE' | 'SUITE'

export type RoomStatusType = 'OUT_OF_SERVICE' | 'OCCUPIED' | 'AVAILABLE' | 'RESERVED' | 'CLEANING'

export type ReservationType = 'NON-GUARANTEED' | 'DEPOSIT-RECEIVED' | 'GUARANTEED'

export type BookingStatusType =
  | 'NON-CONFIRMED'
  | 'RESERVED'
  | 'CHECKED-IN'
  | 'CHECKED-OUT'
  | 'NO-SHOW'
  | 'CANCELLED'

export type BookingSourceType = 'WALK-IN' | 'PHONE' | 'WEBSITE' | 'OTHERS'
