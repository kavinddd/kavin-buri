import { useNavigate } from "react-router";
import { toast } from "sonner";
import BookingForm from "./BookingForm";
import { BookingId, BookingSaveReq } from "./types";
import { createBooking } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function BookingCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation<BookingId, Error, BookingSaveReq>({
    mutationFn: createBooking,
    onSuccess: (bookingId) => {
      toast.success("Booking is succesfully created.");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(`/booking/show/${bookingId}`);
    },
    onError: (error) => {
      console.error("Error creating booking:", error.message);
      toast.error(error.message);
    },
  });

  const { error } = mutation;

  return (
    <div className="max-w-screen-xl mx-auto">
      <BookingForm
        mode="CREATE"
        onSubmit={mutation.mutate}
        error={error ?? undefined}
      />
    </div>
  );
}
