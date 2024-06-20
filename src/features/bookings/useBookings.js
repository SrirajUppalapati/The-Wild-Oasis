import { useQuery } from "@tanstack/react-query";
import { getAllBookings as getAllBookingsAPI } from "../../services/apiBookings";

export function useAllBookings() {
  const {
    isPending: isGettingAllBookings,
    data: getAllBookings,
    error,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: getAllBookingsAPI,
  });
  return { isGettingAllBookings, getAllBookings, error };
}
