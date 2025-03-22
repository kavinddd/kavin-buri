import type { RoomTypeNameType } from "@/core/types";

export interface RoomType {
  id: number;
  name: RoomTypeNameType;
  areaSqMeter: number;
  maxAdult: number;
  maxChildren: number;
}
