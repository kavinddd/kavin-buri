import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import GuestForm from "./GuestForm";
import { GuestId, GuestSaveReq } from "./types";
import { updateGuest } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function GuestEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<GuestId, Error, GuestSaveReq>({
    mutationFn: (req: GuestSaveReq) => updateGuest(req, Number(id)),
    onSuccess: (guestId) => {
      toast.success("Guest is succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      navigate(`/guest/show/${guestId}`);
    },
    onError: (error) => {
      console.error("Error updating guest:", error.message);
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
      <GuestForm
        mode="EDIT"
        id={Number(id)}
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
