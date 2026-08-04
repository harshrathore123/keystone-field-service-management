import { useEffect, useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import DashboardLayout from "../../components/layout/DashboardLayout";

import WorkOrderTable from "./WorkOrderTable";
import WorkOrderForm from "./WorkOrderForm";

import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";

import type { WorkOrder } from "../../types/WorkOrder";

import WorkOrderService from "../../services/WorkOrderService";

function WorkOrderPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [workOrderToDelete, setWorkOrderToDelete] = useState<number | null>(
    null,
  );

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadWorkOrders = async () => {
    try {
      setLoading(true);

      const data = await WorkOrderService.getAllWorkOrders();

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

  const handleEdit = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setWorkOrderToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (workOrderToDelete === null) return;

    try {
      await WorkOrderService.deleteWorkOrder(workOrderToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Work Order deleted successfully.");
      setSnackbarOpen(true);

      await loadWorkOrders();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Delete failed.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setWorkOrderToDelete(null);
    }
  };

  const handleSave = async (workOrder: WorkOrder) => {
    try {
      if (workOrder.id) {
        await WorkOrderService.updateWorkOrder(workOrder.id, workOrder);
      } else {
        await WorkOrderService.createWorkOrder(workOrder);
      }

      setOpen(false);

      setSnackbarSeverity("success");
      setSnackbarMessage("Work Order saved successfully.");
      setSnackbarOpen(true);

      await loadWorkOrders();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Save failed.");
      setSnackbarOpen(true);
    }
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredWorkOrders = workOrders.filter((workOrder) => {
    const keyword = search.toLowerCase();

    return (
      workOrder.workOrderNumber.toLowerCase().includes(keyword) ||
      workOrder.title.toLowerCase().includes(keyword) ||
      workOrder.priority.toLowerCase().includes(keyword) ||
      workOrder.status.toLowerCase().includes(keyword)
    );
  });

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Work Orders
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage maintenance requests and technician assignments
          </Typography>
        </Box>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Work Order
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search by Work Order Number, Title or Customer..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <WorkOrderTable
          workOrders={filteredWorkOrders}
          onEdit={handleEdit}
          onDelete={handleDelete}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
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

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Work Order"
        message="Are you sure you want to delete this Work Order?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setWorkOrderToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </DashboardLayout>
  );
}

export default WorkOrderPage;
