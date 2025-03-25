import type { SortDirectionType } from "./paginate.js";
import type { ReservationType } from "./types.js";

export const roleNameEnum = [
  "ADMIN",
  "READ_BOOKING",
  "EDIT_BOOKING",
  "READ_ROOM",
  "EDIT_ROOM",
  "READ_ROLE_GROUP",
  "EDIT_ROLE_GROUP",
  "READ_PRICING",
  "EDIT_PRICING",
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
] as const;

export const reservationEnum: ReservationType[] = [
  "NON-GUARANTEED",
  "DEPOSIT-RECEIVED",
  "GUARANTEED",
];

export const bookingStatusEnum = [
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
