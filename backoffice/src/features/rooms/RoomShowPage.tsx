import { toast } from "sonner";
import RoomForm from "./RoomForm";
import { useNavigate, useParams } from "react-router";

export default function RoomShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <RoomForm mode="SHOW" id={Number(id)} />
    </div>
  );
}
