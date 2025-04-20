import { useNavigate } from "react-router";
import { toast } from "sonner";
import UserForm from "./UserForm";
import { UserId, UserSaveReq } from "./types";
import { createUser } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<UserId, Error, UserSaveReq>({
    mutationFn: createUser,
    onSuccess: (userId) => {
      toast.success("User is succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate(`/user/show/${userId}`);
    },
    onError: (error) => {
      console.error("Error creating user:", error.message);
      toast.error(error.message);
    },
  });

  const { error } = mutation;

  return (
    <div className="max-w-screen-xl mx-auto">
      <UserForm
        mode="CREATE"
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
