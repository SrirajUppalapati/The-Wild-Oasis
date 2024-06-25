import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getBooking as getBookingAPI,
  deleteBooking as deleteBookingAPI,
} from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useGetBooking() {
  const { id } = useParams();
  const {
    isPending: isLoading,
    data: getBooking,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBookingAPI(id),
  });
  return { isLoading, getBooking, error };
}

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingAPI(bookingId),
    onSuccess: () => {
      toast.success("Successfully deleted the booking.");
      queryClient.invalidateQueries({ queryKey: ["booking", "stay"] });
    },
    onError: (err) => toast.error("Could not delete the booking."),
  });

  return { isDeleting, deleteBooking };
}
