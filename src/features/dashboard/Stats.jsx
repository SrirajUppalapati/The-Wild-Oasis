import { MdCabin } from "react-icons/md";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import { BiBook, BiMoney } from "react-icons/bi";
import { HiChartBar } from "react-icons/hi";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  const numBookings = bookings.length;

  const sales = bookings.reduce((acc, curr) => acc + curr.total_price, 0);

  const checkins = confirmedStays.length;

  const occupancyRate =
    confirmedStays.reduce((acc, curr) => curr.num_nights + acc, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        icon={<BiBook />}
        title="Number of Bookings"
        value={numBookings}
        color="blue"
      />
      <Stat
        icon={<BiMoney />}
        title="Total Sales"
        value={`${formatCurrency(sales)}`}
        color="green"
      />
      <Stat
        icon={<MdCabin />}
        title="Confirmed Cabins"
        value={checkins}
        color="yellow"
      />
      <Stat
        icon={<HiChartBar />}
        title="Occupancy Rate"
        value={`${(occupancyRate * 100).toFixed(2)}%`}
        color="brand"
      />
    </>
  );
}

export default Stats;
