import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import type { ReportSummary } from "../../types/ReportSummary";
import type { LinearProgressProps } from "@mui/material/LinearProgress";

interface Props {
  report: ReportSummary;
}

const ProgressCards = ({ report }: Props) => {
  const total =
    report.newWorkOrders +
    report.assignedWorkOrders +
    report.inProgressWorkOrders +
    report.completedWorkOrders +
    report.onHoldWorkOrders +
    report.closedWorkOrders +
    report.cancelledWorkOrders;

  const getPercent = (value: number) =>
    total === 0 ? 0 : (value / total) * 100;

  const data: {
    label: string;
    value: number;
    color: LinearProgressProps["color"];
  }[] = [
    {
      label: "Completed",
      value: report.completedWorkOrders,
      color: "success",
    },
    {
      label: "In Progress",
      value: report.inProgressWorkOrders,
      color: "warning",
    },
    {
      label: "Assigned",
      value: report.assignedWorkOrders,
      color: "info",
    },
    {
      label: "Cancelled",
      value: report.cancelledWorkOrders,
      color: "error",
    },
  ];

  return (
    <Paper
      elevation={6}
      sx={{
        mt: 3,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Work Order Progress
      </Typography>

      <Stack spacing={3}>
        {data.map((item) => (
          <Box key={item.label}>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <Typography fontWeight={600}>{item.label}</Typography>

              <Typography fontWeight={700} color="primary">
                {item.value} ({getPercent(item.value).toFixed(1)}%)
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={getPercent(item.value)}
              color={item.color}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: "#ECEFF1",
              }}
            />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default ProgressCards;
