import { RoomTypeNameType } from "@/core/types";

export interface PricingGetReq {
  year: number;
  month: number;
  roomTypeName: RoomTypeNameType;
}

export interface PricingSaveReq {
  year: number;
  month: number;
  roomTypeName: RoomTypeNameType;
  roomPrices: {
    day: number;
    price: number;
  }[];
}

export interface RoomTypePrice {
  id: number;
  roomTypeId: number;
  date: Date;
  price: number;

  updatedAt: Date;
  updatedBy: number;

  createdBy: number;
  createdAt: Date;
}

export type RoomTypePriceId = number;
