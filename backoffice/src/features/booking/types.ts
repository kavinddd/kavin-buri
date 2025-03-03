import { PaginateReq } from "@/core/paginate";
import { BookingId } from "@/core/typeAliases";

export interface BookingFull {
  id: BookingId;
  firstName: string;
  lastName: string;
  email: string;
  telNum: string;
  numAdult: number;
  numChildren: number;
  checkInDate: string;
  checkOutDate: string;
  roomType: "DELUXE" | "SHIT";
  hasBreakfast: boolean;
  isWantPickup: boolean;
}

export type BookingSort = "CHECK-IN-DATE";

export type BookingFullPaginateReq = PaginateReq<BookingSort>;
