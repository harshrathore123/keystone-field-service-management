import {
  Grid,
  Paper,
  Stack,
  Typography,
  Chip,
} from "@mui/material";
import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const QuickStats = ({ report }: Props) => {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">
              System Summary
            </Typography>

            <Chip
              color="primary"
              label={`Customers : ${report.totalCustomers}`}
            />

            <Chip
              color="success"
              label={`Sites : ${report.totalSites}`}
            />

            <Chip
              color="warning"
              label={`Technicians : ${report.totalTechnicians}`}
            />

            <Chip
              color="secondary"
              label={`Work Orders : ${report.totalWorkOrders}`}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">
              Active Orders
            </Typography>

            <Chip
              color="info"
              label={`New : ${report.newWorkOrders}`}
            />

            <Chip
              color="warning"
              label={`Assigned : ${report.assignedWorkOrders}`}
            />

            <Chip
              color="secondary"
              label={`In Progress : ${report.inProgressWorkOrders}`}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">
              Closed Orders
            </Typography>

            <Chip
              color="success"
              label={`Completed : ${report.completedWorkOrders}`}
            />

            <Chip
              color="default"
              label={`Closed : ${report.closedWorkOrders}`}
            />

            <Chip
              color="error"
              label={`Cancelled : ${report.cancelledWorkOrders}`}
            />
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuickStats;