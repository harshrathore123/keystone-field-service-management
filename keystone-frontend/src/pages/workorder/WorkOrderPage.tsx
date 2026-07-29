import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../components/layout/DashboardLayout";

import WorkOrderTable from "./WorkOrderTable";
import WorkOrderForm from "./WorkOrderForm";

import type { WorkOrder } from "../../types/WorkOrder";

import WorkOrderService from "../../services/WorkOrderService";

function WorkOrderPage() {

  const [workOrders, setWorkOrders] =
    useState<WorkOrder[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState<WorkOrder | null>(null);

  const [snackbarOpen, setSnackbarOpen] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const [snackbarSeverity, setSnackbarSeverity] =
    useState<"success" | "error">("success");

  const loadWorkOrders = async () => {

    try {

      setLoading(true);

      const data =
        await WorkOrderService.getAllWorkOrders();

      setWorkOrders(data);

    } catch {

      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load Work Orders.");
      setSnackbarOpen(true);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    const fetchData = async () => {
      await loadWorkOrders();
    };

    void fetchData();

  }, []);

    const handleAdd = () => {
    setSelectedWorkOrder(null);
    setOpen(true);
  };

  const handleEdit = (
    workOrder: WorkOrder
  ) => {
    setSelectedWorkOrder(workOrder);
    setOpen(true);
  };

  const handleDelete = async (
    id: number
  ) => {

    if (
      !window.confirm(
        "Delete this Work Order?"
      )
    ) {
      return;
    }

    try {

      await WorkOrderService.deleteWorkOrder(id);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        "Work Order deleted successfully."
      );
      setSnackbarOpen(true);

      await loadWorkOrders();

    } catch {

      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Delete failed."
      );
      setSnackbarOpen(true);

    }

  };

  const handleSave = async (
    workOrder: WorkOrder
  ) => {

    try {

      if (workOrder.id) {

        await WorkOrderService.updateWorkOrder(
          workOrder.id,
          workOrder
        );

      } else {

        await WorkOrderService.createWorkOrder(
          workOrder
        );

      }

      setOpen(false);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        "Work Order saved successfully."
      );
      setSnackbarOpen(true);

      await loadWorkOrders();

    } catch {

      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Save failed."
      );
      setSnackbarOpen(true);

    }

  };

  return (

    <DashboardLayout>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >

        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Work Orders
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Work Order
        </Button>

      </Box>

            {loading ? (

        <CircularProgress />

      ) : (

        <WorkOrderTable
          workOrders={workOrders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >

        <WorkOrderForm
          workOrder={selectedWorkOrder}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />

      </Dialog>

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

export default WorkOrderPage;