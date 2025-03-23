import { toast } from "sonner";
import RoleGroupForm from "./RoleGroupForm";
import { useNavigate, useParams } from "react-router";

export default function RoleGroupShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <RoleGroupForm mode="SHOW" id={Number(id)} />
    </div>
  );
}
