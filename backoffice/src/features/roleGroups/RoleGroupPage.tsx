import { ColumnDef } from "@tanstack/react-table";
import { RoleGroup, RoleGroupSearch } from "./types";
import { fetchRoleGroups } from "./api";
import { useState } from "react";
import PaginateDataTable from "@/components/datatable/PaginateDataTable";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Edit, Eye, PlusIcon } from "lucide-react";
import RoleGroupSearchPanel from "./RoleGroupSearchPanel";
import { Badge } from "@/components/ui/badge";

const defaultSearch: RoleGroupSearch = {};

export default function RoleGroupPage() {
  const [search, setSearch] = useState<RoleGroupSearch>({});

  const navigate = useNavigate();

  const columns: ColumnDef<RoleGroup>[] = [
    {
      id: "actions", // Unique ID since there's no accessorKey
      header: "Actions",
      cell: ({ row }) => {
        const booking = row.original;

        return (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => navigate(`/roleGroup/show/${booking.id}`)}
            >
              <Eye className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(`/roleGroup/edit/${booking.id}`)}
            >
              <Edit className="h-6 w-6 " />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => (
        <div className="flex gap-0.5">
          {row.original.roles.map((it) => (
            <Badge key={it.id} variant="outline">
              {it.name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "updatedAt",
      header: "Last updated",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-4">
        <RoleGroupSearchPanel
          onSubmit={setSearch}
          defaultSearch={defaultSearch}
        />

        <div className="text-end">
          <Button onClick={() => navigate("create")}>
            <PlusIcon /> Create a Role Group
          </Button>
        </div>

        <PaginateDataTable
          queryKey="roleGroups"
          api={fetchRoleGroups}
          search={search}
          columns={columns}
        />
      </div>
    </>
  );
}
