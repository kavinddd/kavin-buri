import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import UserForm from "./UserForm";
import { UserId, UserSaveReq } from "./types";
import { updateUser } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<UserId, Error, UserSaveReq>({
    mutationFn: (req: UserSaveReq) => updateUser(req, Number(id)),
    onSuccess: (userId) => {
      toast.success("User is succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate(`/user/show/${userId}`);
    },
    onError: (error) => {
      console.error("Error updating user:", error.message);
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
      <UserForm
        mode="EDIT"
        id={Number(id)}
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
