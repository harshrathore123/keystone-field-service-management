import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const COLORS = [
  "#1976d2",
  "#f9a825",
  "#8e24aa",
  "#2e7d32",
  "#ed6c02",
  "#d32f2f",
];

const DashboardPieChart = ({ report }: Props) => {
  const data = [
    {
      name: "New",
      value: report.newWorkOrders,
    },
    {
      name: "Assigned",
      value: report.assignedWorkOrders,
    },
    {
      name: "In Progress",
      value: report.inProgressWorkOrders,
    },
    {
      name: "Completed",
      value: report.completedWorkOrders,
    },
    {
      name: "On Hold",
      value: report.onHoldWorkOrders,
    },
    {
      name: "Cancelled",
      value: report.cancelledWorkOrders,
    },
  ].filter((item) => item.value > 0);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={110}
          paddingAngle={3}
          label={({ name, percent }) =>
            `${name} ${(percent! * 100).toFixed(0)}%`
          }
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => [String(value ?? 0), "Work Orders"]} />

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{
            paddingTop: 10,
            fontSize: 13,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DashboardPieChart;
