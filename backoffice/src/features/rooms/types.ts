import { PaginateReq } from "@/core/paginate";
import { RoomStatusType, RoomTypeNameType } from "@/core/types";
import { RoomType } from "../roomType/types";

export interface Room {
  id: number;
  code: string;
  status: RoomStatusType;
  floorNo: number;
  updatedAt: Date;
  updatedBy: number;

  roomType: RoomType;
}

export type RoomId = number;
export type RoomSort = Extract<keyof Room, "id" | "code" | "updatedAt">;
export const bookingSortEnum: RoomSort[] = ["id", "code", "updatedAt"];
export type RoomSearch = Partial<Room>;
export type RoomPaginateReq = PaginateReq<RoomSort, RoomSearch>;

export interface RoomSaveReq {
  code: string;
  status: RoomStatusType;
  floorNo: number;

  roomTypeName: RoomTypeNameType;
}

export type RoomUpdateReq = Partial<RoomSaveReq>;
