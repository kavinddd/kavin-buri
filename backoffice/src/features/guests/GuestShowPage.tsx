import { toast } from "sonner";
import GuestForm from "./GuestForm";
import { useNavigate, useParams } from "react-router";

export default function GuestShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <GuestForm mode="SHOW" id={Number(id)} />
    </div>
  );
}
