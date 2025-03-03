import DataTable from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Booking, BookingFull } from "./types";
import usePaginateBookings from "./hooks/useBooking";

const bookings: Booking.Full[] = [
  {
    id: 1,
    firstName: "Prommest",
    lastName: "Kavindechatorn",
    email: "prommest123@hotmail.com",
    telNum: "092-313-7310",
    numAdult: 2,
    numChildren: 0,
    checkInDate: "2024-03-20",
    checkOutDate: "2024-03-30",
    roomType: "DELUXE",
    hasBreakfast: true,
    isWantPickup: true,
  },
  {
    id: 2,
    firstName: "Prommest",
    lastName: "Kavindechatorn",
    email: "prommest123@hotmail.com",
    telNum: "092-313-7310",
    numAdult: 2,
    numChildren: 0,
    checkInDate: "2024-03-20",
    checkOutDate: "2024-03-30",
    roomType: "DELUXE",
    hasBreakfast: true,
    isWantPickup: true,
  },
];

const columns: ColumnDef<BookingFull>[] = [
  {
    accessorKey: "firstName",
    header: "Firstname",
  },
  {
    accessorKey: "lastName",
    header: "Lastname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telNum",
    header: "Tel No.",
  },

  {
    accessorKey: "roomType",
    header: "Room",
  },

  {
    accessorKey: "hasBreakfast",
    header: "ABF",
  },

  {
    accessorKey: "isWantPickup",
    header: "Transportation",
  },
  {
    accessorKey: "checkInDate",
    header: "Check-in",
  },
  {
    accessorKey: "checkOutDate",
    header: "Check-out",
  },
];

export default function BookingPage() {
  const { data, isLoading } = usePaginateBookings({
    sort: "CHECK-IN-DATE",
  });

  return <DataTable data={bookings} columns={columns} />;
}
