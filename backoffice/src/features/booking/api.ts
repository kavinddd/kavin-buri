import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { BookingFull, BookingSort } from "./types";

const path = "bookings";

// list paginate
export async function fetchBookings(
  req: PaginateReq<BookingSort>,
): Promise<Paginated<BookingFull>> {
  const bookings = await fetchJson<Paginated<BookingFull>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );

  return bookings;
}
