import { fetchJson } from "@/core/api";
import {
  PricingGetReq,
  PricingSaveReq,
  RoomTypePrice,
  RoomTypePriceId,
} from "./types";

const path = "pricings";

export async function getPricing(req: PricingGetReq): Promise<RoomTypePrice[]> {
  const queryParams: Record<string, string> = {
    year: String(req.year),
    month: String(req.month),
    roomTypeName: req.roomTypeName,
  };
  const booking = await fetchJson<RoomTypePrice[]>(
    `${path}`,
    {
      method: "GET",
    },
    queryParams,
  );

  return booking;
}

export async function createPricing(
  req: PricingSaveReq,
): Promise<RoomTypePriceId[]> {
  const ids = await fetchJson<RoomTypePriceId[]>(`${path}`, {
    method: "POST",
    body: JSON.stringify(req),
  });
  return ids;
}
