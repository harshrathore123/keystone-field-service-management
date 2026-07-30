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
import PartTable from "./PartTable";
import PartForm from "./PartForm";

import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";

import type { Part } from "../../types/Part";

import {
  getAllParts,
  createPart,
  updatePart,
  deletePart,
} from "../../services/PartService";

function PartPage() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<"success" | "error">("success");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partToDelete, setPartToDelete] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const loadParts = async () => {
    try {
      setLoading(true);
      const data = await getAllParts();
      setParts(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load parts.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchParts = async () => {
      await loadParts();
    };

    void fetchParts();
  }, []);

  const handleAdd = () => {
    setSelectedPart(null);
    setOpen(true);
  };

  const handleEdit = (part: Part) => {
    setSelectedPart(part);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setPartToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (partToDelete === null) return;

    try {
      await deletePart(partToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Part deleted successfully.");
      setSnackbarOpen(true);

      await loadParts();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Delete failed.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setPartToDelete(null);
    }
  };

  const handleSave = async (part: Part) => {
    try {
      if (part.id) {
        await updatePart(part.id, part);
      } else {
        await createPart(part);
      }

      setOpen(false);

      setSnackbarSeverity("success");
      setSnackbarMessage("Part saved successfully.");
      setSnackbarOpen(true);

      await loadParts();
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

  const filteredParts = parts.filter((part) => {
    const keyword = search.toLowerCase();

    return (
      part.partName.toLowerCase().includes(keyword) ||
      part.partNumber.toLowerCase().includes(keyword) ||
      part.category.toLowerCase().includes(keyword)
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
          Inventory
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Part
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search Part..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

            {loading ? (
        <CircularProgress />
      ) : (
        <PartTable
          parts={filteredParts}
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
        <PartForm
          part={selectedPart}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Part"
        message="Are you sure you want to delete this part?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setPartToDelete(null);
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

export default PartPage;