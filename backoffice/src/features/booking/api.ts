import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { Booking, BookingSearch, BookingSort } from "./types";

const path = "bookings";

// list paginate
export async function fetchBookings(
  req: PaginateReq<BookingSort, BookingSearch>,
): Promise<Paginated<Booking>> {
  const bookings = await fetchJson<Paginated<Booking>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );

  return bookings;
}
