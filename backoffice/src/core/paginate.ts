export interface Paginated<T> {
  data: T[];
  page: number;
  totalCount: number;
}

export interface PaginateReq<Sort extends string> {
  page: number;
  size: number;
  sort: Sort;
  ascending?: boolean;
}

export function toQueryParams<Sort extends string>(
  paginateReq: PaginateReq<Sort>,
): string {
  return new URLSearchParams({
    page: paginateReq.page.toString(),
    pageSize: paginateReq.size.toString(),
    sort: paginateReq.sort,
    ascending: paginateReq.ascending?.toString() || "true",
  }).toString();
}
