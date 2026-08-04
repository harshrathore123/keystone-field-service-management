import { Grid, Paper, Stack, Typography, Chip } from "@mui/material";
import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const QuickStats = ({ report }: Props) => {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: 4,
            height: "100%",
          }}
        >
          <Stack spacing={2.2}>
            <Typography variant="h6" fontWeight={700}>
              System Summary
              <Typography variant="body2" color="text.secondary" mb={1}>
                Overall application statistics
              </Typography>
            </Typography>

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="primary"
              label={`Customers : ${report.totalCustomers}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="success"
              label={`Sites : ${report.totalSites}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="warning"
              label={`Technicians : ${report.totalTechnicians}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="secondary"
              label={`Work Orders : ${report.totalWorkOrders}`}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Active Orders</Typography>

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="info"
              label={`New : ${report.newWorkOrders}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="warning"
              label={`Assigned : ${report.assignedWorkOrders}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="secondary"
              label={`In Progress : ${report.inProgressWorkOrders}`}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Closed Orders</Typography>

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="success"
              label={`Completed : ${report.completedWorkOrders}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
              color="default"
              label={`Closed : ${report.closedWorkOrders}`}
            />

            <Chip
              sx={{
                fontWeight: 600,
                justifyContent: "flex-start",
              }}
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
