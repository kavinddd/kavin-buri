import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookingId, BookingSaveReq } from "./types";
import { checkIn } from "./api";
import BookingForm from "./BookingForm";

export default function CheckInPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<BookingId, Error, BookingSaveReq>({
    mutationFn: (req: BookingSaveReq) => checkIn(Number(id), req),
    onSuccess: (bookingId) => {
      toast.success("Booking is succesfully updated.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(`/booking/show/${bookingId}`);
    },
    onError: (error) => {
      console.error("Error updating booking:", error.message);
      toast.error(error.message);
    },
  });

  if (!id) {
    toast.error("Booking Id is not provided.");
    navigate("/bookings");
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <BookingForm
        mode="EDIT"
        onSubmit={mutation.mutate}
        id={Number(id)}
        showGuests
        showRoom
      />
    </div>
  );
}
