import { ColumnDef } from "@tanstack/react-table";
import { Room, RoomSearch } from "./types";
import { fetchRooms } from "./api";
import { useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import RoomSearchPanel from "./RoomSearchPanel";

const defaultSearch: RoomSearch = {};

export default function RoomPage() {
  const [search, setSearch] = useState<RoomSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<Room>[] = [
    {
      id: "actions", // Unique ID since there's no accessorKey
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/room/show/${booking.id}`)}
            >
              <Eye className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/room/edit/${booking.id}`)}
            >
              <Edit className="h-6 w-6 " />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "floorNo",
      header: "Floor No.",
    },
    {
      accessorKey: "roomType.name",
      header: "Room Type",
    },
    {
      accessorKey: "updatedAt",
      header: "Last updated",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <RoomSearchPanel onSubmit={setSearch} defaultSearch={defaultSearch} />

        {
          // <div className="text-end">
          //   <Button onClick={() => navigate("create")}>
          //     <PlusIcon />
          //     Create a Room
          //   </Button>
          // </div>
          //
        }

        <PaginateDataTable
          queryKey="rooms"
          api={fetchRooms}
          search={search}
          columns={columns}
        />
      </div>
    </>
  );
}
