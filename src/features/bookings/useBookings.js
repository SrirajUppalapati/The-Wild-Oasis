import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings as getAllBookingsAPI } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useAllBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortBy");
  const pageValue = searchParams.get("page");

  let filter = "";
  let page;
  let sort = { column: "", type: "" };

  if (!filterValue || filterValue === "all") {
    filter = null;
  } else {
    filter = filterValue;
  }

  if (sortValue && sortValue !== "none") {
    if (sortValue === "cabin-name-asc") {
      sort.column = "cabins(name)";
      sort.type = "asc";
    } else if (sortValue === "cabin-name-desc") {
      sort.column = "cabins(name)";
      sort.type = "desc";
    } else if (sortValue === "guest-name-asc") {
      sort.column = "guests(full_name)";
      sort.type = "asc";
    } else if (sortValue === "guest-name-desc") {
      sort.column = "guests(full_name)";
      sort.type = "desc";
    } else if (sortValue === "date-asc") {
      sort.column = "start_date";
      sort.type = "asc";
    } else if (sortValue === "date-desc") {
      sort.column = "start_date";
      sort.type = "desc";
    }
  }

  if (!pageValue) {
    page = 1;
  } else {
    page = Number(pageValue);
  }

  const {
    isPending: isGettingAllBookings,
    data,
    error,
  } = useQuery({
    queryKey: ["booking", filter, sort, page],
    queryFn: () => getAllBookingsAPI({ filter, sort, page }),
  });

  const getAllBookings = data?.data;
  const count = data?.count;

  const pageCount = Math.ceil(count / 10);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sort, page + 1],
      queryFn: () => getAllBookingsAPI({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sort, page - 1],
      queryFn: () => getAllBookingsAPI({ filter, sort, page: page - 1 }),
    });
  }
  return { isGettingAllBookings, getAllBookings, error, count };
}
