import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function NotFoundPage() {
  const navigate = useNavigate();

  navigate("/");
  toast.error("Page was not found");
  return null;
}
