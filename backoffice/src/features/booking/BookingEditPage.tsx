import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import BookingForm from "./BookingForm";
import { BookingId, BookingSaveReq } from "./types";
import { updateBooking } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function BookingEditPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const mutation = useMutation<BookingId, Error, BookingSaveReq>({
    mutationFn: (req: BookingSaveReq) => updateBooking(req, Number(id)),
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

  const { error } = mutation;

  if (!id) {
    navigate(-1);
    toast.error("Id is required");
    return null;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <BookingForm
        mode="EDIT"
        id={Number(id)}
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
