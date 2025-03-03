import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBookings } from "../api";
import { BookingSort } from "../types";
import { PaginateReq } from "@/core/paginate";

export default function usePaginateBookings({
  sort,
  ascending,
  size,
}: {
  sort: BookingSort;
  ascending?: boolean;
  size?: number;
}) {
  return useInfiniteQuery({
    queryKey: ["bookings"],
    queryFn: (ctx) => {
      const req: PaginateReq<BookingSort> = {
        page: ctx.pageParam || 1,
        size: size || 10,
        sort: sort,
        ascending: ascending || true,
      };

      return fetchBookings(req);
    },
    getNextPageParam: ({ page }) => page + 1,
    getPreviousPageParam: ({ page }) => page - 1,
  });
}
