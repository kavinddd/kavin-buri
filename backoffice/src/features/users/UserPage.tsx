import { ColumnDef } from "@tanstack/react-table";
import { User, UserSearch } from "./types";
import { fetchUsers } from "./api";
import { useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import UserSearchPanel from "./UserSearchPanel";

const defaultSearch: UserSearch = {};

export default function UserPage() {
  const [search, setSearch] = useState<UserSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = [
    {
      id: "actions", // Unique ID since there's no accessorKey
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/user/show/${booking.id}`)}
            >
              <Eye className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/user/edit/${booking.id}`)}
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
      accessorKey: "userType.name",
      header: "User Type",
    },
    {
      accessorKey: "updatedAt",
      header: "Last updated",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <UserSearchPanel onSubmit={setSearch} defaultSearch={defaultSearch} />

        {
          // <div className="text-end">
          //   <Button onClick={() => navigate("create")}>
          //     <PlusIcon />
          //     Create a User
          //   </Button>
          // </div>
          //
        }

        <PaginateDataTable
          queryKey="users"
          api={fetchUsers}
          search={search}
          columns={columns}
        />
      </div>
    </>
  );
}
