import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import MyJobsTable from "../technician/MyJobTable";
import type { WorkOrder } from "../../types/WorkOrder";
import WorkOrderService from "../../services/WorkOrderService";

function MyJobsPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await WorkOrderService.getMyAssignedJobs();
      setWorkOrders(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load assigned jobs.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const fetchJobs = async () => {
    await loadJobs();
  };

  fetchJobs();
}, []);

  const handleStart = async (id: number) => {
    try {
      await WorkOrderService.startJob(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Job started successfully.");

      await loadJobs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to start job.");
    }

    setSnackbarOpen(true);
  };

  const handlePause = async (id: number) => {
    try {
      await WorkOrderService.pauseJob(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Job paused successfully.");

      await loadJobs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to pause job.");
    }

    setSnackbarOpen(true);
  };

  const handleResume = async (id: number) => {
    try {
      await WorkOrderService.resumeJob(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Job resumed successfully.");

      await loadJobs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to resume job.");
    }

    setSnackbarOpen(true);
  };

  const handleComplete = async (id: number) => {
    try {
      await WorkOrderService.completeJob(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Job completed successfully.");

      await loadJobs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to complete job.");
    }

    setSnackbarOpen(true);
  };

  return (
    <DashboardLayout>
      <Box mb={3}>
        <Box mb={3}>
  <Typography variant="h4" fontWeight="bold">
    My Assigned Jobs
  </Typography>

  <Typography
    variant="body2"
    color="text.secondary"
  >
    View and manage your assigned work orders
  </Typography>
</Box>
      </Box>

      {loading ? (
      <Box
  display="flex"
  justifyContent="center"
  py={8}
>
  <CircularProgress />
</Box>
      ) : (
        <MyJobsTable
          workOrders={workOrders}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onComplete={handleComplete}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default MyJobsPage;