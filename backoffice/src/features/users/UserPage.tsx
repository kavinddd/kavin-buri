import { ColumnDef } from "@tanstack/react-table";
import { User, UserSearch } from "./types";
import { fetchUsers } from "./api";
import { useMemo, useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Eye, PlusIcon } from "lucide-react";
import UserSearchPanel from "./UserSearchPanel";
import { Badge } from "@/components/ui/badge";

const defaultSearch: UserSearch = {};

export default function UserPage() {
  const [search, setSearch] = useState<UserSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<User>[] = useMemo(
    () => [
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
        accessorKey: "fullName",
        header: "Full Name",
      },
      {
        accessorKey: "username",
        header: "Username",
      },
      {
        accessorKey: "roleGroups",
        header: "Role Groups",
        cell: ({ row }) => (
          <div className="flex gap-0.5">
            {row.original.roleGroups.map((roleGroup) => (
              <Badge key={roleGroup.id} variant="outline">
                {roleGroup.name}
              </Badge>
            ))}
          </div>
        ),
      },
      {
        accessorKey: "isActive",
        header: "Active",
      },
      {
        accessorKey: "updatedAt",
        header: "Last updated",
      },
    ],
    [navigate],
  );

  return (
    <>
      <div className="flex flex-col gap-4">
        <UserSearchPanel onSubmit={setSearch} defaultSearch={defaultSearch} />

        <div className="text-end">
          <Button onClick={() => navigate("create")}>
            <PlusIcon />
            Create a User
          </Button>
        </div>

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
