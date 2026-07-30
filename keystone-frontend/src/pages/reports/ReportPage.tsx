import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import LockIcon from "@mui/icons-material/Lock";
import CancelIcon from "@mui/icons-material/Cancel";

import type { ReportSummary } from "../../types/ReportSummary";
import ReportService from "../../services/ReportService";
import ReportCard from "./ReportCard";
import ReportChart from "./ReportChart";
import StatusTable from "./StatusTable";
import ProgressCards from "./ProgressCards";
import ReportExport from "./ReportExport";
import ReportExcel from "./ReportExcel";
import QuickStats from "./QuickStats";
import RecentActivity from "./RecentActivity";

const ReportPage = () => {
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await ReportService.getReportSummary();
        setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!report) {
    return <Typography color="error">Failed to load report.</Typography>;
  }

  return (
    <Container maxWidth={false} sx={{ mt: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Reports Dashboard
        </Typography>

        <Box display="flex" gap={2}>
          <ReportExport report={report} />
          <ReportExcel report={report} />
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Customers"
            value={report.totalCustomers}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Sites"
            value={report.totalSites}
            icon={<BusinessIcon />}
            color="#2e7d32"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Technicians"
            value={report.totalTechnicians}
            icon={<EngineeringIcon />}
            color="#ed6c02"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Work Orders"
            value={report.totalWorkOrders}
            icon={<AssignmentIcon />}
            color="#7b1fa2"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="New"
            value={report.newWorkOrders}
            icon={<FiberNewIcon />}
            color="#0288d1"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Assigned"
            value={report.assignedWorkOrders}
            icon={<AssignmentIndIcon />}
            color="#fb8c00"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="In Progress"
            value={report.inProgressWorkOrders}
            icon={<BuildCircleIcon />}
            color="#8e24aa"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <ReportCard
            title="Completed"
            value={report.completedWorkOrders}
            icon={<CheckCircleIcon />}
            color="#43a047"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ReportCard
            title="On Hold"
            value={report.onHoldWorkOrders}
            icon={<PauseCircleIcon />}
            color="#ff9800"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ReportCard
            title="Closed"
            value={report.closedWorkOrders}
            icon={<LockIcon />}
            color="#546e7a"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <ReportCard
            title="Cancelled"
            value={report.cancelledWorkOrders}
            icon={<CancelIcon />}
            color="#e53935"
          />
        </Grid>
      </Grid>

      <ReportChart report={report} />
      <StatusTable report={report} />
      <ProgressCards report={report} />
      <QuickStats report={report} />

      <RecentActivity />
    </Container>
  );
};

export default ReportPage;
