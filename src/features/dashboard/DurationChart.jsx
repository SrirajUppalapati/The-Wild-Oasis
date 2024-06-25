import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startData = [
  {
    duration: "1 night",
    value: 0,
    color: "var(--color-blue-700)",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "var(--color-green-700)",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "var(--color-yellow-700)",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "var(--color-red-700)",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "var(--color-silver-700)",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "var(--color-indigo-700)",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "var(--color-grey-700)",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "var(--color-brand-700)",
  },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((startData, cur) => {
      const num = cur.num_nights;
      if (num === 1) return incArrayValue(startData, "1 night");
      if (num === 2) return incArrayValue(startData, "2 nights");
      if (num === 3) return incArrayValue(startData, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(startData, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(startData, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(startData, "8-14 nights");
      if (num >= 15 && num <= 21)
        return incArrayValue(startData, "15-21 nights");
      if (num >= 21) return incArrayValue(startData, "21+ nights");
      return startData;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ stays }) {
  const data = prepareData(startData, stays);

  return (
    <ChartBox>
      <span style={{ textAlign: "center" }}>
        <Heading as="h2">Stay Duratioin Summary</Heading>
      </span>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="duration"
            innerRadius={80}
            outerRadius={100}
            cx="50%"
            cy="40%"
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell fill={entry.color} stroke={entry.color} key={index} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            height={200}
            layout="vertical"
            iconSize="5"
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
