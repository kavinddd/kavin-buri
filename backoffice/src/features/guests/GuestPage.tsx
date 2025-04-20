import { ColumnDef } from "@tanstack/react-table";
import { Guest, GuestSearch } from "./types";
import { fetchGuests } from "./api";
import { useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Eye, PlusIcon } from "lucide-react";
import GuestSearchPanel from "./GuestSearchPanel";

const defaultSearch: GuestSearch = {};

export default function GuestPage() {
  const [search, setSearch] = useState<GuestSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<Guest>[] = [
    {
      id: "actions", // Unique ID since there's no accessorKey
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/guest/show/${booking.id}`)}
            >
              <Eye className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/guest/edit/${booking.id}`)}
            >
              <Edit className="h-6 w-6 " />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "citizenId",
      header: "Citizen Id",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "nationality",
      header: "Nationality",
    },
    {
      accessorKey: "dateOfBirth",
      header: "Date Of Birth",
    },
    {
      accessorKey: "updatedAt",
      header: "Last Updated",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <GuestSearchPanel onSubmit={setSearch} defaultSearch={defaultSearch} />

        <div className="text-end">
          <Button onClick={() => navigate("create")}>
            <PlusIcon /> Create a Guest
          </Button>
        </div>

        <PaginateDataTable
          queryKey="guests"
          api={fetchGuests}
          search={search}
          columns={columns}
        />
      </div>
    </>
  );
}
