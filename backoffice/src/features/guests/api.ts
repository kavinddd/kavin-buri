import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { Guest, GuestId, GuestSaveReq, GuestSearch, GuestSort } from "./types";

const path = "guests";

export async function getGuest(id: GuestId): Promise<Guest> {
  const booking = await fetchJson<Guest>(`${path}/${id}`, {
    method: "GET",
  });

  return booking;
}

export async function createGuest(req: GuestSaveReq): Promise<GuestId> {
  const bookingId = await fetchJson<GuestId>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function updateGuest(
  req: GuestSaveReq,
  id: GuestId,
): Promise<GuestId> {
  const bookingId = await fetchJson<GuestId>(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function fetchGuests(
  req: PaginateReq<GuestSort, GuestSearch>,
): Promise<Paginated<Guest>> {
  return fetchJson<Paginated<Guest>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );
}
