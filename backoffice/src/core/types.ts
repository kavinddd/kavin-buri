import {
  bookingSourceEnum,
  bookingStatusEnum,
  roomStatusEnum,
  roomTypeNameEnum,
} from "./enums";

export type RoleNameType =
  | "ADMIN"
  | "READ_BOOKING"
  | "EDIT_BOOKING"
  | "READ_ROOM"
  | "EDIT_ROOM"
  | "READ_ROLE_GROUP"
  | "EDIT_ROLE_GROUP"
  | "READ_GUEST"
  | "EDIT_GUEST"
  | "READ_USER"
  | "EDIT_USER";

export type RoomTypeNameType = (typeof roomTypeNameEnum)[number];
export type RoomStatusType = (typeof roomStatusEnum)[number];

export type ReservationType =
  | "NON-GUARANTEED"
  | "DEPOSIT-RECEIVED"
  | "GUARANTEED";

export type BookingStatusType = (typeof bookingStatusEnum)[number];
// | "RESERVED"
// | "CHECKED-IN"
// | "CHECKED-OUT"
// | "NO-SHOW"
// | "CANCELLED";

export type BookingSourceType = (typeof bookingSourceEnum)[number];

export type FormMode = "SHOW" | "CREATE" | "EDIT";
