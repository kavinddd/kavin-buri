import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE_SIZE, Paginated, PaginateReq } from "@/core/paginate";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import SkeletonTableRow from "./SkeletonTableRow";
import { toast } from "sonner";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";
import { formatDate } from "date-fns";

function useQueryPaginate<
  Data,
  Sort extends string,
  Search extends Record<string, unknown>,
>({
  queryKey,
  api,
  sort,
  ascending,
  size = DEFAULT_PAGE_SIZE,
  search,
  page = 1,
}: {
  queryKey: string;
  api: (req: PaginateReq<Sort, Search>) => Promise<Paginated<Data>>;
  sort?: Sort;
  ascending?: boolean;
  size?: number;
  search: Search;
  page?: number;
}) {
  const searchStr = useMemo(
    () =>
      JSON.stringify(
        Object.entries(search).map(([key, val]) => {
          if (val instanceof Date) return [key, formatDate(val, "yyyy-MM-dd")];
          return [key, val];
        }),
      ),
    [search],
  );
  const memoQueryKey = useMemo(
    () => [
      queryKey,
      {
        sort,
        ascending,
        size,
        search: searchStr,
        page,
      },
    ],

    [queryKey, ascending, searchStr, size, sort, page],
  );

  return useQuery<Paginated<Data>, Error>({
    queryKey: memoQueryKey,
    queryFn: () => {
      const req: PaginateReq<Sort, Search> = {
        page: page,
        size: size,
        sort: sort,
        direction: undefined,
        // direction: ascending ? "asc" : "desc",
        search: search,
      };

      return api(req);
    },
    staleTime: DEFAULT_REACT_QUERY_STALE_TIME,
  });
}

interface DataTableProps<
  TData,
  TValue,
  Sort extends string,
  Search extends Record<string, unknown>,
> {
  columns: ColumnDef<TData, TValue>[];
  api: (req: PaginateReq<Sort, Search>) => Promise<Paginated<TData>>;
  search: Search;
  queryKey: string;
}

export default function PaginateDataTable<
  TData,
  TValue,
  Sort extends string,
  Search extends Record<string, unknown>,
>({
  columns,
  api,
  search,
  queryKey,
}: DataTableProps<TData, TValue, Sort, Search>) {
  const [currentPage, setCurrentPage] = useState(1);

  // === reset to page 1 if search is changed ===
  // FIXME: temp solution it doubles API call
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  // ============================================

  const {
    data: paginated,
    error,
    isLoading,
    isError,
    isFetching,
  } = useQueryPaginate({
    api: api,
    search: search,
    page: currentPage,
    queryKey: queryKey,
  });

  const data = useMemo(() => paginated?.data || [], [paginated?.data]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    autoResetPageIndex: true,
  });

  const total = paginated?.total;
  const size = paginated?.data.length ?? 0;
  const sizePerPage = DEFAULT_PAGE_SIZE;
  const start = sizePerPage * (currentPage - 1);
  const end = sizePerPage * (currentPage - 1) + size;
  const maxPage = Math.ceil((paginated?.total ?? sizePerPage) / sizePerPage);

  const pages =
    currentPage <= 3
      ? [1, 2, 3, 4, 5]
      : Array.from({ length: 5 }).map((_, i) => {
          const startPage = currentPage - 2;
          return startPage + i;
        });

  function handleChangePage(page: number) {
    if (page < 1) return;
    if (page === currentPage) return;
    if (page > currentPage && !paginated?.hasNext) return;
    if (page > maxPage) return;

    setCurrentPage(page);
  }

  if (isError) toast.error(error.message);

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isFetching || isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonTableRow
                key={`skeleton-row-${i}`}
                colSpan={columns.length}
              />
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-60 text-center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="flex-1 items-center justify-between mt-2">
        <p className="text-sm text-muted-foreground">
          {`Showing of ${size ? start + 1 : 0} to ${end} of ${total || 0} entries`}
        </p>
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              className={cn(
                "cursor-pointer",
                currentPage === 1 && "cursor-not-allowed text-muted-foreground",
              )}
              onClick={() => handleChangePage(currentPage - 1)}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem
              key={page}
              className={cn(
                "cursor-pointer",
                page > maxPage && "cursor-not-allowed text-muted-foreground",
              )}
              onClick={() => handleChangePage(page)}
            >
              <PaginationLink
                className={cn(page === currentPage && "text-primary font-bold")}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem
            className={cn(
              "cursor-pointer",
              !paginated?.hasNext && "cursor-not-allowed text-muted-foreground",
            )}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
