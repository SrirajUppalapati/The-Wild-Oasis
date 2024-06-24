import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingsFilterSort from "../features/bookings/BookingsFilterSort";
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingsFilterSort />
      </Row>
      <BookingTable />
    </>
  );
}

export default Bookings;
