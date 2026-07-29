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
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";

import type { Customer } from "../../types/Customer";

import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/CustomerService";

function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getAllCustomers();
      setCustomers(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load customers.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchCustomers = async () => {
    await loadCustomers();
  };

  void fetchCustomers();
}, []);

  const handleAdd = () => {
    setSelectedCustomer(null);
    setOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Customer deleted successfully.");
      setSnackbarOpen(true);

      loadCustomers();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Delete failed.");
      setSnackbarOpen(true);
    }
  };

  const handleSave = async (customer: Customer) => {
    try {
      if (customer.id) {
        await updateCustomer(customer.id, customer);
      } else {
        await createCustomer(customer);
      }

      setOpen(false);

      setSnackbarSeverity("success");
      setSnackbarMessage("Customer saved successfully.");
      setSnackbarOpen(true);

      loadCustomers();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Save failed.");
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
        <Typography variant="h4" fontWeight="bold">
          Customers
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Customer
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <CustomerTable
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <CustomerForm
          customer={selectedCustomer}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default CustomerPage;