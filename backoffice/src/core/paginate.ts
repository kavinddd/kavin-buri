export interface Paginated<T> {
  data: T[];
  page: number;
  totalCount: number;
}

export interface PaginateReq<Sort extends string> {
  page: number;
  size: number;
  sort: Sort;
  direction?: "asc" | "desc";
}

export function toQueryParams<Sort extends string>(
  paginateReq: PaginateReq<Sort>,
): string {
  return new URLSearchParams({
    page: paginateReq.page.toString(),
    pageSize: paginateReq.size.toString(),
    sort: paginateReq.sort,
    direction: paginateReq.direction || "asc",
  }).toString();
}
