import { RoleNameType } from "@/core/types";
import { Role } from "../roles/types";
import type { UserId } from "../users/types";
import type { PaginateReq } from "@/core/paginate";

export interface RoleGroup {
  id: RoleGroupId;

  name: string;
  createdAt: Date;
  createdBt: UserId;
  updatedAt: Date;
  updatedBy: UserId;

  roles: Role[];
}

export type RoleGroupId = number;
export type RoleGroupSort = Extract<keyof RoleGroup, "id" | "updatedAt">;
export const roleGroupSortEnum: RoleGroupSort[] = ["id", "updatedAt"];
export type RoleGroupSearch = Partial<RoleGroup>;
export type RoleGroupPaginateReq = PaginateReq<RoleGroupSort, RoleGroupSearch>;

export interface RoleGroupSaveReq {
  name: string;
  roles: RoleNameType[];
}

export type RoleGroupUpdateReq = Partial<RoleGroupSaveReq>;
