import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import WorkOrderService from "../../services/WorkOrderService";
import type { WorkOrder } from "../../types/WorkOrder";
import MyJobsTable from "./MyJobTable";

function TechnicianDashboard() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  const loadJobs = async () => {
    try {
      const data = await WorkOrderService.getMyAssignedJobs();
      setWorkOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchJobs = async () => {
      try {
        const data = await WorkOrderService.getMyAssignedJobs();

        if (mounted) {
          setWorkOrders(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void fetchJobs();

    return () => {
      mounted = false;
    };
  }, []);

  const handleStart = async (id: number) => {
    await WorkOrderService.startJob(id);
    await loadJobs();
  };

  const handlePause = async (id: number) => {
    await WorkOrderService.pauseJob(id);
    await loadJobs();
  };

  const handleResume = async (id: number) => {
    await WorkOrderService.resumeJob(id);
    await loadJobs();
  };

  const handleComplete = async (id: number) => {
    await WorkOrderService.completeJob(id);
    await loadJobs();
  };

  const assignedJobs = workOrders.length;

  const inProgressJobs = workOrders.filter(
    (job) => job.status === "IN_PROGRESS"
  ).length;

  const completedJobs = workOrders.filter(
    (job) => job.status === "COMPLETED"
  ).length;

  const pausedJobs = workOrders.filter(
    (job) => job.status === "ON_HOLD"
  ).length;

  return (
    <DashboardLayout>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Technician Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Assigned Jobs
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {assignedJobs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                In Progress
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {inProgressJobs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Completed Jobs
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {completedJobs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                On Hold Jobs
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {pausedJobs}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                My Assigned Jobs
              </Typography>

              <MyJobsTable
                workOrders={workOrders}
                onStart={handleStart}
                onPause={handlePause}
                onResume={handleResume}
                onComplete={handleComplete}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default TechnicianDashboard;