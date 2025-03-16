import { PaginateReq } from "@/core/paginate";
import { BookingId } from "@/core/typeAliases";
import { BookingSourceType, BookingStatusType, RoomType } from "@/core/types";

export interface Booking {
  id: BookingId;
  paymentId: string;
  roomType: RoomType;
  status: BookingStatusType;
  contactName: string;
  email: string;
  contactNumber: string;
  checkInDate: string;
  checkOutDate: string;
  roomPrice: number;
  numAdult: number;
  numChildren: number;
  hasAbf: boolean;
  hasTransportation: boolean;
  source: BookingSourceType;
}

export type BookingId = number;
export type BookingSort = Extract<keyof Booking, "id" | "checkInDate">;
export const bookingSortEnum: BookingSort[] = ["id", "checkInDate"];
export type BookingSearch = Partial<Booking>;
export type BookingPaginateReq = PaginateReq<BookingSort, BookingSearch>;
