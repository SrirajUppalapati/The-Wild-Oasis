import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import {
  getBookingsAfterDate,
  getStaysAfterDate,
  getStaysTodayActivity,
} from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDays = subDays(new Date(), numDays).toISOString();

  const { isPending, data: recentBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDays),
    queryKey: ["booking", `last-${numDays}`],
  });

  return { isPending, recentBookings, numDays };
}

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));
  const queryDays = subDays(new Date(), numDays).toISOString();

  const { isPending: isRecentStays, data: recentStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDays),
    queryKey: ["stay", `last-${numDays}`],
  });

  const confirmedStays = recentStays?.filter(
    (curr) => curr.status === "checked-in" || curr.status === "checked-out"
  );
  return { isRecentStays, recentStays, confirmedStays };
}

export function useTodayActivity() {
  const { isPending, data: todayActivity } = useQuery({
    queryFn: () => getStaysTodayActivity(),
    queryKey: ["today-activity"],
  });
  return { isPending, todayActivity };
}
