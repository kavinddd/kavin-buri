import { useNavigate } from "react-router";
import { toast } from "sonner";
import RoleGroupForm from "./RoleGroupForm";
import { RoleGroupId, RoleGroupSaveReq } from "./types";
import { createRoleGroup } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RoleGroupCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<RoleGroupId, Error, RoleGroupSaveReq>({
    mutationFn: createRoleGroup,
    onSuccess: (roleGroupId) => {
      toast.success("RoleGroup is succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["roleGroups"] });
      navigate(`/roleGroup/show/${roleGroupId}`);
    },
    onError: (error) => {
      console.error("Error creating roleGroup:", error.message);
      toast.error(error.message);
    },
  });

  const { error } = mutation;

  return (
    <div className="max-w-screen-xl mx-auto">
      <RoleGroupForm
        mode="CREATE"
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
