import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import {
  Booking,
  BookingId,
  BookingSaveReq,
  BookingSearch,
  BookingSort,
  BookingUpdateReq,
} from "./types";

const path = "bookings";

export async function getBooking(id: BookingId): Promise<Booking> {
  const booking = await fetchJson<Booking>(`${path}/${id}`, {
    method: "GET",
  });

  return booking;
}

export async function createBooking(req: BookingSaveReq): Promise<BookingId> {
  const bookingId = await fetchJson<BookingId>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function updateBooking(
  id: BookingId,
  req: BookingUpdateReq,
): Promise<BookingId> {
  const bookingId = await fetchJson<BookingId>(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
  return bookingId;
}

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

export async function checkIn(
  id: BookingId,
  req: BookingUpdateReq,
): Promise<BookingId> {
  const bookingId = await fetchJson<BookingId>(`${path}/checkIn/${id}`, {
    method: "POST",
    body: JSON.stringify(req),
  });

  return bookingId;
}

export async function checkOut(bookingId: BookingId): Promise<BookingId> {
  const id = await fetchJson<BookingId>(`${path}/checkOut/${bookingId}`, {
    method: "POST",
  });

  return id;
}
