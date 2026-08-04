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
import CustomerTable from "./CustomerTable";
import CustomerForm from "./CustomerForm";
import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";
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
    null,
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const [search, setSearch] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const handleDelete = (id: number) => {
    setCustomerToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (customerToDelete === null) return;

    try {
      await deleteCustomer(customerToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Customer deleted successfully.");
      setSnackbarOpen(true);

      await loadCustomers();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Delete failed.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setCustomerToDelete(null);
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

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.customerName.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.companyName.toLowerCase().includes(keyword)
    );
  });

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
            Customers
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage customer information and companies
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            borderRadius: 3,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Customer
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search Customer..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={8}>
          <CircularProgress />
        </Box>
      ) : filteredCustomers.length === 0 ? (
        <Box
          py={8}
          textAlign="center"
          bgcolor="background.paper"
          borderRadius={3}
        >
          <Typography variant="h6">No customers found</Typography>

          <Typography color="text.secondary">
            Try another search keyword.
          </Typography>
        </Box>
      ) : (
        <CustomerTable
          customers={filteredCustomers}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <CustomerForm
          customer={selectedCustomer}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Customer"
        message="Are you sure you want to delete this customer?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setCustomerToDelete(null);
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

export default CustomerPage;
