import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckInOut() {
  const queryClient = useQueryClient();

  const { isPending, mutate: checkInOut } = useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBooking(bookingId, { status: status, has_paid: true }),
    onSuccess: () => {
      toast.success(`Successfully checkedin / checkedout`);
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => toast.error("There is an error with checking in."),
  });
  return { isPending, checkInOut };
}

export function useBreakfast() {
  const queryClient = useQueryClient();

  const { isPending: wantBreakfast, mutate: breakfast } = useMutation({
    mutationFn: ({ bookingId, has_breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        has_paid: true,
        ...has_breakfast,
      }),
    onSuccess: () => {
      toast.success("Successfully Checked In");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (err) => toast.error("There is an error with adding breakfast."),
  });
  return { wantBreakfast, breakfast };
}
