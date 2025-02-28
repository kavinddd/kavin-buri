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
    header: "Telephone No.",
  },

  {
    accessorKey: "roomType",
    header: "Room",
  },

  {
    accessorKey: "hasBreakfast",
    header: "BF",
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
  const table = useReactTable({
    data: bookings,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
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
          {table.getRowModel().rows?.length ? (
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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
