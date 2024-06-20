import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import { useAllBookings } from "./useBookings";
// import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { isGettingAllBookings, getAllBookings, error } = useAllBookings();

  if (isGettingAllBookings) return <Spinner />;

  if (error) return <div>{error.message}</div>;
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body>
        {getAllBookings?.map((booking) => (
          <BookingRow key={booking.id} booking={booking} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default BookingTable;
