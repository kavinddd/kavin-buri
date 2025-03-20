import { PaginateReq } from "@/core/paginate";
import {
  BookingSourceType,
  BookingStatusType,
  RoomTypeNameType,
} from "@/core/types";
import { RoomType } from "../roomType/types";

export interface Booking {
  id: BookingId;
  paymentId: string;
  status: BookingStatusType;
  contactName: string;
  email: string;
  contactNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomPrice: number;
  numAdult: number;
  numChildren: number;
  hasAbf: boolean;
  hasTransportation: boolean;
  source: BookingSourceType;

  roomType?: RoomType;
}

export type BookingId = number;
export type BookingSort = Extract<keyof Booking, "id" | "checkInDate">;
export const bookingSortEnum: BookingSort[] = ["id", "checkInDate"];
export type BookingSearch = Partial<Booking>;
export type BookingPaginateReq = PaginateReq<BookingSort, BookingSearch>;

export interface BookingSaveReq {
  roomTypeName: RoomTypeNameType;
  contactName: string;
  email: string;
  contactNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
  roomPrice: number;
  numAdult: number;
  numChildren: number;
  hasAbf: boolean;
  hasTransportation: boolean;
  source: BookingSourceType;
}

export type BookingUpdateReq = Partial<BookingSaveReq>;
