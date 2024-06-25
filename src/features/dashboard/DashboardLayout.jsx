import styled from "styled-components";
import { useRecentBookings, useRecentStays } from "./useDashboard";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useGetAllCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isPending, recentBookings, numDays } = useRecentBookings();

  const { isRecentStays, confirmedStays } = useRecentStays();

  const { isGettingAllCabins, getAllCabins } = useGetAllCabins();

  if (isPending || isRecentStays || isGettingAllCabins) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        confirmedStays={confirmedStays}
        numCabins={getAllCabins.length}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart stays={confirmedStays} />
      <SalesChart bookings={recentBookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
