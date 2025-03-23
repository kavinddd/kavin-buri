import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import { User, UserId, UserSaveReq, UserSearch, UserSort } from "./types";

const path = "users";

export async function getUser(id: UserId): Promise<User> {
  const booking = await fetchJson<User>(`${path}/${id}`, {
    method: "GET",
  });

  return booking;
}

export async function createUser(req: UserSaveReq): Promise<UserId> {
  const bookingId = await fetchJson<UserId>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function updateUser(
  req: UserSaveReq,
  id: UserId,
): Promise<UserId> {
  const bookingId = await fetchJson<UserId>(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function fetchUsers(
  req: PaginateReq<UserSort, UserSearch>,
): Promise<Paginated<User>> {
  const bookings = await fetchJson<Paginated<User>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );

  return bookings;
}
