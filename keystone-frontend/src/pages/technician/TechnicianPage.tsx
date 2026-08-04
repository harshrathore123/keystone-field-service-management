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
import TechnicianTable from "../technician/TechnicianTable";
import TechnicianForm from "../technician/TechnicianForm";

import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";

import type { Technician } from "../../types/Technician";

import {
  getAllTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
} from "../../services/TechnicianService";

function TechnicianPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedTechnician, setSelectedTechnician] =
    useState<Technician | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [technicianToDelete, setTechnicianToDelete] = useState<number | null>(
    null,
  );

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadTechnicians = async () => {
    try {
      setLoading(true);

      const data = await getAllTechnicians();

      setTechnicians(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load technicians.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTechnicians = async () => {
      await loadTechnicians();
    };

    void fetchTechnicians();
  }, []);

  const handleAdd = () => {
    setSelectedTechnician(null);
    setOpen(true);
  };

  const handleEdit = (technician: Technician) => {
    setSelectedTechnician(technician);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setTechnicianToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (technicianToDelete === null) return;

    try {
      await deleteTechnician(technicianToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Technician deleted successfully.");
      setSnackbarOpen(true);

      await loadTechnicians();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Delete failed.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setTechnicianToDelete(null);
    }
  };

  const handleSave = async (technician: Technician) => {
    try {
      if (technician.id) {
        await updateTechnician(technician.id, technician);
      } else {
        await createTechnician(technician);
      }

      setOpen(false);

      setSnackbarSeverity("success");
      setSnackbarMessage("Technician saved successfully.");
      setSnackbarOpen(true);

      await loadTechnicians();
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

  const filteredTechnicians = technicians.filter((technician) => {
    const keyword = search.toLowerCase();

    return (
      technician.firstName.toLowerCase().includes(keyword) ||
      technician.lastName.toLowerCase().includes(keyword) ||
      technician.email.toLowerCase().includes(keyword) ||
      technician.phoneNumber.toLowerCase().includes(keyword) ||
      technician.role.toLowerCase().includes(keyword)
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
        <Typography variant="h4" fontWeight="bold">
          Technicians
          <Typography variant="body2" color="text.secondary" mb={3}>
            Manage technician profiles and assignments
          </Typography>
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Technician
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search technicians by name, email or phone..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TechnicianTable
          technicians={filteredTechnicians}
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
        maxWidth="md"
        fullWidth
      >
        <TechnicianForm
          technician={selectedTechnician}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Technician"
        message="Are you sure you want to delete this technician?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setTechnicianToDelete(null);
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

export default TechnicianPage;
