import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { Room, RoomId, RoomSaveReq, RoomSearch, RoomSort } from "./types";
import { ListDropdown } from "@/core/dropdown";
import { cleanForm } from "@/core/utils";

const path = "rooms";

export async function getRoom(id: RoomId): Promise<Room> {
  const booking = await fetchJson<Room>(`${path}/${id}`, {
    method: "GET",
  });

  return booking;
}

export async function createRoom(req: RoomSaveReq): Promise<RoomId> {
  const bookingId = await fetchJson<RoomId>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function updateRoom(
  req: RoomSaveReq,
  id: RoomId,
): Promise<RoomId> {
  const bookingId = await fetchJson<RoomId>(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function fetchRooms(
  req: PaginateReq<RoomSort, RoomSearch>,
): Promise<Paginated<Room>> {
  const bookings = await fetchJson<Paginated<Room>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );

  return bookings;
}

export async function listRoomDropdown(
  q?: string,
  search?: RoomSearch,
): Promise<ListDropdown<RoomId>> {
  const query = cleanForm({
    q: q,
    id: search?.id ? String(search.id) : "",
    floorNo: search?.floorNo ? String(search.floorNo) : "",
    roomTypeName: search?.roomTypeName || "",
    status: search?.status || "",
  });

  return fetchJson<ListDropdown<RoomId>>(
    `${path}/dropdown`,
    {
      method: "GET",
    },
    query,
  );
}
