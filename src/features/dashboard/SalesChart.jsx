import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
`;

const colors = {
  totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
  extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
  text: "#374151",
  background: "#fff",
};

function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((curr) => {
    return {
      label: format(curr, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(curr, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.total_price, 0),
      extraSales: bookings
        .filter((booking) => isSameDay(curr, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extra_price, 0),
    };
  });

  return (
    <StyledSalesChart>
      <span style={{ textAlign: "center" }}>
        <Heading as="h2">Sales</Heading>
        {format(allDates[0], "MMM dd yyyy")} -{" "}
        {format(new Date(), "MMM dd yyyy")}
      </span>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray={1} />
          <XAxis dataKey="label" />
          <YAxis unit="$" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            name="Total Sales"
            unit="$"
          />
          <Area
            type="monotone"
            dataKey="extraSales"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            name="Extra Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
