import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import RoomForm from "./RoomForm";
import { RoomId, RoomSaveReq } from "./types";
import { updateRoom } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function RoomEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<RoomId, Error, RoomSaveReq>({
    mutationFn: (req: RoomSaveReq) => updateRoom(req, Number(id)),
    onSuccess: (roomId) => {
      toast.success("Room is succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      navigate(`/room/show/${roomId}`);
    },
    onError: (error) => {
      console.error("Error updating room:", error.message);
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
      <RoomForm
        mode="EDIT"
        id={Number(id)}
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
