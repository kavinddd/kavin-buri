import DataTable from "@/components/DataTable";
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

type BookingType = {
  firstName: string;
  lastName: string;
  email: string;
  telNum: string;
  numAdult: number;
  numChildren: number;
  checkInDate: string;
  checkOutDate: string;
  roomType: "DELUXE" | "SHIT";
  hasBreakfast: boolean;
  isWantPickup: boolean;
};

const bookings: BookingType[] = [
  {
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

const columns: ColumnDef<BookingType>[] = [
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
  return <DataTable data={bookings} columns={columns} />;
}
