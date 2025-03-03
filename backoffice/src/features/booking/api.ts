import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { BookingFull, BookingSort } from "./types";

const path = "booking";

// list paginate
export async function fetchBookings(
  req: PaginateReq<BookingSort>,
): Promise<Paginated<BookingFull>> {
  const bookings = await fetchJson<Paginated<BookingFull>>(
    `${path}/paginate`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );

  return bookings;
}
