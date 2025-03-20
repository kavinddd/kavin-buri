import { ColumnDef } from "@tanstack/react-table";
import { Booking, BookingSearch } from "./types";
import { fetchBookings } from "./api";
import { memo, useMemo, useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import BookingSearchPanel from "./BookingSearchPanel";
import useDefaultSearchParams from "@/hooks/useDefaultSearchParams";
import { Button } from "@/components/ui/button";
import { Edit, Eye, PlusIcon } from "lucide-react";

type CustomSearch = {
  checkInToday: boolean;
  checkOutToday: boolean;
};

type SearchParams = CustomSearch & Partial<BookingSearch>;

const acceptedSearchParams: SearchParams = {
  status: undefined,
  checkInToday: false,
  checkOutToday: false,
};

export default function BookingPage() {
  const { defaultSearch } =
    useDefaultSearchParams<SearchParams>(acceptedSearchParams);

  const memoDefaultSearch: BookingSearch = useMemo(
    () => ({
      status: defaultSearch.status,
      checkInDate: defaultSearch.checkInToday ? new Date() : undefined,
      checkOutDate: defaultSearch.checkOutToday ? new Date() : undefined,
    }),
    [defaultSearch],
  );

  const searchPanelKey = useMemo(() => {
    return JSON.stringify(memoDefaultSearch);
  }, [memoDefaultSearch]);

  const [search, setSearch] = useState<BookingSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<Booking>[] = [
    {
      id: "actions", // Unique ID since there's no accessorKey
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/booking/show/${booking.id}`)}
            >
              <Eye className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/booking/edit/${booking.id}`)}
            >
              <Edit className="h-6 w-6 " />
            </Button>
          </div>
        );
      },
    },
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

  return (
    <>
      <div className="flex flex-col gap-4">
        <BookingSearchPanel
          key={searchPanelKey}
          onSubmit={setSearch}
          defaultSearch={memoDefaultSearch}
        />

        <div className="text-end">
          <Button onClick={() => navigate("create")}>
            <PlusIcon />
            Create a Booking
          </Button>
        </div>

        <PaginateDataTable
          queryKey="bookings"
          api={fetchBookings}
          search={search}
          columns={columns}
        />
      </div>
    </>
  );
}
