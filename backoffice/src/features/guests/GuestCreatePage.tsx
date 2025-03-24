import { useNavigate } from "react-router";
import { toast } from "sonner";
import GuestForm from "./GuestForm";
import { GuestId, GuestSaveReq } from "./types";
import { createGuest } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GuestCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<GuestId, Error, GuestSaveReq>({
    mutationFn: createGuest,
    onSuccess: (guestId) => {
      toast.success("Guest is succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      navigate(`/guest/show/${guestId}`);
    },
    onError: (error) => {
      console.error("Error creating guest:", error.message);
      toast.error(error.message);
    },
  });

  const { error } = mutation;

  return (
    <div className="max-w-screen-xl mx-auto">
      <GuestForm
        mode="CREATE"
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
