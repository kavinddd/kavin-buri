import { toast } from "sonner";
import UserForm from "./UserForm";
import { useNavigate, useParams } from "react-router";

export default function UserShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <UserForm mode="SHOW" id={Number(id)} />
    </div>
  );
}
