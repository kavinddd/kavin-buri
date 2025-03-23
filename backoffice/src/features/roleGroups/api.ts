import { fetchJson } from "@/core/api";
import { Paginated, PaginateReq, toQueryParams } from "@/core/paginate";
import {
  RoleGroup,
  RoleGroupId,
  RoleGroupSaveReq,
  RoleGroupSearch,
  RoleGroupSort,
} from "./types";

const path = "roleGroups";

export async function getRoleGroup(id: RoleGroupId): Promise<RoleGroup> {
  const booking = await fetchJson<RoleGroup>(`${path}/${id}`, {
    method: "GET",
  });

  return booking;
}

export async function createRoleGroup(
  req: RoleGroupSaveReq,
): Promise<RoleGroupId> {
  const bookingId = await fetchJson<RoleGroupId>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function updateRoleGroup(
  req: RoleGroupSaveReq,
  id: RoleGroupId,
): Promise<RoleGroupId> {
  const bookingId = await fetchJson<RoleGroupId>(`${path}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(req),
  });
  return bookingId;
}

export async function fetchRoleGroups(
  req: PaginateReq<RoleGroupSort, RoleGroupSearch>,
): Promise<Paginated<RoleGroup>> {
  return fetchJson<Paginated<RoleGroup>>(
    `${path}`,
    {
      method: "GET",
    },
    toQueryParams(req),
  );
}
