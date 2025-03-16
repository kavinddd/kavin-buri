import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Booking, BookingSearch } from "./types";
import { fetchBookings } from "./api";
import { useMemo, useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useParams, useSearchParams } from "react-router";
import BookingSearchPanel from "./BookingSearchPanel";

const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "contactNumber",
    header: "Tel No.",
  },
  {
    accessorKey: "roomType",
    header: "Room",
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in",
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-out",
  },
  {
    accessorKey: "numAdult",
    header: "Adult",
  },
  {
    accessorKey: "numChildren",
    header: "Children",
  },
  {
    accessorKey: "roomPrice",
    header: "Price",
  },
  {
    accessorKey: "hasAbf",
    header: "ABF",
  },
  {
    accessorKey: "hasTransportation",
    header: "Transport.",
  },
];

export default function BookingPage() {
  const [params, _] = useSearchParams();
  const [search, setSearch] = useState<BookingSearch>(params as BookingSearch);

  return (
    <>
      {
        // <BookingSearchPanel
        //   onSubmit={setSearch}
        //   defaultSearch={params as BookingSearch}
        //
        // />
      }
      <PaginateDataTable
        queryKey="bookings"
        apis={fetchBookings}
        search={search}
        columns={columns}
      />
    </>
  );
}
