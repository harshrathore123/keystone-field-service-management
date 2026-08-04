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
import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";

import PartUsageTable from "./PartUsageTable";
import PartUsageForm from "./PartUsageForm";

import type { PartUsage } from "../../types/partUsage";

import {
  getAllPartUsages,
  createPartUsage,
  updatePartUsage,
  deletePartUsage,
} from "../../services/partUsageService";

function PartUsagePage() {
  const [partUsages, setPartUsages] = useState<PartUsage[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedPartUsage, setSelectedPartUsage] = useState<PartUsage | null>(
    null,
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [partUsageToDelete, setPartUsageToDelete] = useState<number | null>(
    null,
  );

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadPartUsages = async () => {
    try {
      setLoading(true);

      const data = await getAllPartUsages();

      setPartUsages(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to load Part Usage.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPartUsages = async () => {
      await loadPartUsages();
    };

    void fetchPartUsages();
  }, []);

  const handleAdd = () => {
    setSelectedPartUsage(null);
    setOpen(true);
  };

  const handleEdit = (partUsage: PartUsage) => {
    setSelectedPartUsage(partUsage);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setPartUsageToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (partUsageToDelete === null) return;

    try {
      await deletePartUsage(partUsageToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Part Usage deleted successfully.");
      setSnackbarOpen(true);

      await loadPartUsages();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to delete Part Usage.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setPartUsageToDelete(null);
    }
  };

  const handleSave = async (partUsage: PartUsage) => {
    try {
      if (partUsage.id) {
        await updatePartUsage(partUsage.id, partUsage);
      } else {
        await createPartUsage(partUsage);
      }

      setOpen(false);
      setSelectedPartUsage(null);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        partUsage.id
          ? "Part Usage updated successfully."
          : "Part Usage created successfully.",
      );

      await loadPartUsages();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to save Part Usage.");
      setSnackbarOpen(true);
    }
  };

  const filteredPartUsages = partUsages.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.remarks.toLowerCase().includes(keyword) ||
      item.usedDate.toLowerCase().includes(keyword) ||
      item.partName?.toLowerCase().includes(keyword) ||
      item.workOrderNumber?.toLowerCase().includes(keyword)
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
            Part Usage
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Track inventory usage across work orders
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
          Add Part Usage
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search by Work Order, Part or Remarks..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <PartUsageTable
          partUsages={filteredPartUsages}
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
        <PartUsageForm
          partUsage={selectedPartUsage}
          onSave={handleSave}
          onCancel={() => setOpen(false)}
        />
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Part Usage"
        message="Are you sure you want to delete this usage record?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setPartUsageToDelete(null);
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

export default PartUsagePage;
