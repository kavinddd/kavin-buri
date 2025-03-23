import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import RoleGroupForm from "./RoleGroupForm";
import { RoleGroupId, RoleGroupSaveReq } from "./types";
import { updateRoleGroup } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RoleGroupEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<RoleGroupId, Error, RoleGroupSaveReq>({
    mutationFn: (req: RoleGroupSaveReq) => updateRoleGroup(req, Number(id)),
    onSuccess: (roleGroupId) => {
      toast.success("RoleGroup is succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["roleGroups"] });
      navigate(`/roleGroup/show/${roleGroupId}`);
    },
    onError: (error) => {
      console.error("Error updating roleGroup:", error.message);
      toast.error(error.message);
    },
  });

  const { error } = mutation;

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <RoleGroupForm
        mode="EDIT"
        id={Number(id)}
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
