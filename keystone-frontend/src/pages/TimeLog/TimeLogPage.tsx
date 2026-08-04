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

import TimeLogTable from "./TimeLogTable";
import TimeLogForm from "./TimeLogForm";

import type { TimeLog } from "../../types/timeLog";

import {
  getAllTimeLogs,
  createTimeLog,
  updateTimeLog,
  deleteTimeLog,
} from "../../services/timeLogService";

function TimeLogPage() {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [selectedTimeLog, setSelectedTimeLog] = useState<TimeLog | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [timeLogToDelete, setTimeLogToDelete] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const loadTimeLogs = async () => {
    try {
      setLoading(true);

      const data = await getAllTimeLogs();

      setTimeLogs(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to load Time Logs.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTimeLogs = async () => {
      await loadTimeLogs();
    };

    void fetchTimeLogs();
  }, []);

  const handleAdd = () => {
    setSelectedTimeLog(null);
    setOpen(true);
  };

  const handleEdit = (timeLog: TimeLog) => {
    setSelectedTimeLog(timeLog);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setTimeLogToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (timeLogToDelete === null) return;

    try {
      await deleteTimeLog(timeLogToDelete);

      setSnackbarSeverity("success");
      setSnackbarMessage("Time Log deleted successfully.");
      setSnackbarOpen(true);

      await loadTimeLogs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to delete Time Log.");
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setTimeLogToDelete(null);
    }
  };

  const handleSave = async (timeLog: TimeLog) => {
    try {
      if (timeLog.id) {
        await updateTimeLog(timeLog.id, timeLog);
      } else {
        await createTimeLog(timeLog);
      }

      setOpen(false);
      setSelectedTimeLog(null);

      setSnackbarSeverity("success");
      setSnackbarMessage(
        timeLog.id
          ? "Time Log updated successfully."
          : "Time Log created successfully.",
      );
      setSnackbarOpen(true);

      await loadTimeLogs();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Unable to save Time Log.");
      setSnackbarOpen(true);
    }
  };

  const filteredTimeLogs = timeLogs.filter((timeLog) => {
    const keyword = search.toLowerCase();

    return (
      timeLog.workDescription.toLowerCase().includes(keyword) ||
      timeLog.startTime.toLowerCase().includes(keyword) ||
      timeLog.endTime.toLowerCase().includes(keyword) ||
      timeLog.workOrderNumber?.toLowerCase().includes(keyword) ||
      timeLog.workOrderTitle?.toLowerCase().includes(keyword)
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
            Time Logs
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Track technician work hours and activities
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
          Add Time Log
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search by Work Order, Title or Description..."
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
        <TimeLogTable
          timeLogs={filteredTimeLogs}
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
        onClose={() => {
          setOpen(false);
          setSelectedTimeLog(null);
        }}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <TimeLogForm
          timeLog={selectedTimeLog}
          onSave={handleSave}
          onCancel={() => {
            setOpen(false);
            setSelectedTimeLog(null);
          }}
        />
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Time Log"
        message="Are you sure you want to delete this time log record?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setTimeLogToDelete(null);
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

export default TimeLogPage;
