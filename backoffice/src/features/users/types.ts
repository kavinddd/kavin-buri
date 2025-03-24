import { PaginateReq } from "@/core/paginate";
import { RoleGroup, RoleGroupId } from "../roleGroups/types";

export interface User {
  id: UserId;
  fullName: string;
  username: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: UserId;
  updatedBy: UserId;
  roleGroups: RoleGroup[];
}

export type UserId = number;
export type UserSort = Extract<keyof User, "fullName" | "updatedAt">;
export const bookingSortEnum: UserSort[] = ["fullName", "updatedAt"];
export type UserSearch = Partial<User>;
export type UserPaginateReq = PaginateReq<UserSort, UserSearch>;

export interface UserSaveReq {
  fullName: string;
  username: string;
  password: string;
  roleGroupIds: RoleGroupId[];
  isActive: boolean;
}

export type UserUpdateReq = Partial<UserSaveReq>;
