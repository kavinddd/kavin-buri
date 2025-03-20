import { toast } from "sonner";
import BookingForm from "./BookingForm";
import { Navigate, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "./api";
import { Booking } from "./types";
import { DEFAULT_REACT_QUERY_STALE_TIME } from "@/core/constants";

export default function BookingShowPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <BookingForm mode="SHOW" id={Number(id)} />
    </div>
  );
}
