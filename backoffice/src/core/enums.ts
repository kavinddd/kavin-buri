import type { SortDirectionType } from "./paginate.js";
import type { ReservationType } from "./types.js";

export const roleNameEnum = [
  "ADMIN",
  "READ_BOOKING",
  "EDIT_BOOKING",
  "READ_ROOM",
  "EDIT_ROOM",
  "READ_GUEST",
  "EDIT_GUEST",
  "READ_ROLE_GROUP",
  "EDIT_ROLE_GROUP",
  "READ_PRICING",
  "EDIT_PRICING",
  "READ_USER",
  "EDIT_USER",
] as const;

export const roomTypeNameEnum = [
  "SUPERIOR_TWIN",
  "SUPERIOR_DOUBLE",
  "DELUXE",
  "SUITE",
] as const;

export const roomStatusEnum = [
  "OUT_OF_SERVICE",
  "OCCUPIED",
  "AVAILABLE",
  "RESERVED",
  "CLEANING",
] as const;

export const reservationEnum: ReservationType[] = [
  "NON-GUARANTEED",
  "DEPOSIT-RECEIVED",
  "GUARANTEED",
];

export const bookingStatusEnum = [
  "NON-CONFIRMED",
  "RESERVED",
  "CHECKED-IN",
  "CHECKED-OUT",
  "NO-SHOW",
  "CANCELLED",
] as const;

export const bookingSourceEnum = [
  "WALK-IN",
  "PHONE",
  "WEBSITE",
  "OTHERS",
] as const;

export const directionEnum: SortDirectionType[] = ["asc", "desc"];
