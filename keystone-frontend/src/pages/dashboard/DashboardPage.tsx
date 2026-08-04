import { useEffect, useMemo, useState } from "react";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import DashboardLayout from "../../components/layout/DashboardLayout";

import DashboardPieChart from "./DashboardPieChart";
import RecentWorkOrders from "./RecentWorkOrders";

import WorkOrderService from "../../services/WorkOrderService";
import ReportService from "../../services/ReportService";

import type { WorkOrder } from "../../types/WorkOrder";
import type { ReportSummary } from "../../types/ReportSummary";

function DashboardPage() {
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const reportData = await ReportService.getReportSummary();
        setReport(reportData);

        const orders = await WorkOrderService.getAllWorkOrders();
        setWorkOrders(orders);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDashboard();
  }, []);

  const recentWorkOrders = useMemo(() => {
    return [...workOrders]
      .sort((a, b) => (b.id ?? 0) - (a.id ?? 0))
      .slice(0, 5);
  }, [workOrders]);

  if (loading) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CircularProgress size={45} />

          <Typography color="text.secondary">Loading Dashboard...</Typography>
        </Box>
      </DashboardLayout>
    );
  }

  if (!report) {
    return (
      <DashboardLayout>
        <Typography color="error">Failed to load dashboard.</Typography>
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Total Customers",
      value: report.totalCustomers,
      icon: <PeopleIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Active Sites",
      value: report.totalSites,
      icon: <BusinessIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Work Orders",
      value: report.totalWorkOrders,
      icon: <AssignmentIcon fontSize="large" />,
      color: "#7b1fa2",
    },
    {
      title: "Technicians",
      value: report.totalTechnicians,
      icon: <EngineeringIcon fontSize="large" />,
      color: "#ef6c00",
    },
    {
      title: "New",
      value: report.newWorkOrders,
      icon: <FiberNewIcon fontSize="large" />,
      color: "#0288d1",
    },
    {
      title: "Assigned",
      value: report.assignedWorkOrders,
      icon: <AssignmentIndIcon fontSize="large" />,
      color: "#f9a825",
    },
    {
      title: "In Progress",
      value: report.inProgressWorkOrders,
      icon: <BuildCircleIcon fontSize="large" />,
      color: "#8e24aa",
    },
    {
      title: "Completed",
      value: report.completedWorkOrders,
      icon: <CheckCircleIcon fontSize="large" />,
      color: "#2e7d32",
    },
  ];

  return (
    <DashboardLayout>
      <Box mb={3}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 1,
          }}
        >
          Welcome to Keystone Field Service Management System
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                cursor: "pointer",
                transition: ".25s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 8,
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={700} mt={1}>
                      {card.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      bgcolor: card.color,
                      color: "#fff",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid container spacing={3} mt={1}>
          <Grid
            size={{
              xs: 12,
              md: 7,
            }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={3}>
                  Work Order Summary
                </Typography>

                <Grid container spacing={3}>
                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      New
                    </Typography>

                    <Typography variant="h5" fontWeight={700} color="primary">
                      {report.newWorkOrders}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Assigned
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="warning.main"
                    >
                      {report.assignedWorkOrders}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      In Progress
                    </Typography>

                    <Typography variant="h5" fontWeight={700} color="secondary">
                      {report.inProgressWorkOrders}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Completed
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="success.main"
                    >
                      {report.completedWorkOrders}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      On Hold
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="warning.main"
                    >
                      {report.onHoldWorkOrders}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 6,
                      md: 4,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Cancelled
                    </Typography>

                    <Typography
                      variant="h5"
                      fontWeight={700}
                      color="error.main"
                    >
                      {report.cancelledWorkOrders}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 5,
            }}
          >
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Work Order Status
                </Typography>

                <DashboardPieChart report={report} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid
          size={{
            xs: 12,
          }}
          sx={{
            mt: 1,
          }}
        >
          <RecentWorkOrders workOrders={recentWorkOrders} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default DashboardPage;
