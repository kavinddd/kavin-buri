import type { UserId } from "../users/types";
import type { PaginateReq } from "@/core/paginate";

export interface Guest {
  id: GuestId;
  citizenId: string;

  firstName: string;
  lastName: string;
  nationality: string;

  dateOfBirth: Date;

  createdAt: Date;
  createdBt: UserId;
  updatedAt: Date;
  updatedBy: UserId;
}

export type GuestId = number;
export type GuestSort = Extract<keyof Guest, "id" | "updatedAt">;
export const roleGroupSortEnum: GuestSort[] = ["id", "updatedAt"];
export type GuestSearch = Partial<Guest>;
export type GuestPaginateReq = PaginateReq<GuestSort, GuestSearch>;

export interface GuestSaveReq {
  name: string;
  citizenId: string;

  firstName: string;
  lastName: string;
  nationality: string;

  dateOfBirth: Date;
}

export type GuestUpdateReq = Partial<GuestSaveReq>;
