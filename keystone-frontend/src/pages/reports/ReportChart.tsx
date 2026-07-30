import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

import { Grid, Paper, Typography } from "@mui/material";

import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const COLORS = [
  "#42a5f5",
  "#ffa726",
  "#ab47bc",
  "#66bb6a",
  "#ffca28",
  "#78909c",
  "#ef5350",
];

const ReportChart = ({ report }: Props) => {
  const chartData = [
    {
      name: "New",
      value: report.newWorkOrders,
    },
    {
      name: "Assigned",
      value: report.assignedWorkOrders,
    },
    {
      name: "Progress",
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
      name: "Closed",
      value: report.closedWorkOrders,
    },
    {
      name: "Cancelled",
      value: report.cancelledWorkOrders,
    },
  ];

  return (
    <Grid container spacing={3} mt={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: 420,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Work Order Status
          </Typography>

          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 3,
            height: 420,
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            mb={2}
          >
            Work Order Analysis
          </Typography>

          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#1976d2"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportChart;