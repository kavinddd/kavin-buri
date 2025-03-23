import {
  bookingSourceEnum,
  bookingStatusEnum,
  roleNameEnum,
  roomStatusEnum,
  roomTypeNameEnum,
} from "./enums";

export type RoleNameType = (typeof roleNameEnum)[number];

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
