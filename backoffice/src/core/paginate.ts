export const DEFAULT_PAGE_SIZE = 10;

export type SortDirectionType = "asc" | "desc";

export interface Paginated<DataType> {
  data: DataType[];
  page: number;
  total: number;
  hasNext: number;
}

export interface PaginateReq<
  Sort extends string,
  Search extends Record<string, unknown>,
> {
  page: number;
  size?: number;
  sort?: Sort;
  direction?: SortDirectionType;
  search: Search;
}

export function toQueryParams<
  Sort extends string,
  Search extends Record<string, unknown>,
>(paginateReq: PaginateReq<Sort, Search>): string {
  const params = new URLSearchParams({
    page: paginateReq.page.toString(),
    direction: paginateReq.direction || "asc",
  });

  if (paginateReq.sort) params.set("sort", paginateReq.sort);
  if (paginateReq.size) params.set("size", paginateReq.size.toString());

  Object.entries(paginateReq.search).forEach(([key, val]) => {
    params.set(key, String(val));
  });

  return params.toString();
}
