import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getAllBookings({ filter, sort, page }) {
  const query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(full_name, email)", { count: "exact" });

  if (filter !== null) {
    query.eq("status", filter);
  }

  if (sort.column && sort.type) {
    query.order(sort.column, { ascending: sort.type === "asc" });
  }

  const val = 10;

  const { count: totalCount, error: countError } = await query;
  if (countError) {
    console.error(countError);
    throw new Error(
      "The bookings data could not be loaded from the database!!"
    );
  }

  const maxOffset = (page - 1) * val;
  const rangeEnd = Math.min(page * val - 1, totalCount - 1);
  if (maxOffset <= rangeEnd) {
    query.range(maxOffset, rangeEnd);
  } else {
    return { data: [], count: totalCount };
  }

  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error(
      "The bookings data could not be loaded from the database!!"
    );
  }

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("The booking could not be loaded from the database!!");
  }

  return data;
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start_date", date)
    .lte("start_date", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(*)")
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
