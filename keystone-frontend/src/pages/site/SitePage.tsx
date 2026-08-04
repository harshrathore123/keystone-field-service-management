import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import SiteForm from "./SiteForm";
import SiteTable from "./SiteTable";

import SearchBar from "../../components/common/SearchBar";
import ConfirmDeleteDialog from "../../components/common/ConfirmDeleteDialog";
import AppSnackbar from "../../components/common/AppSnackbar";

import type { Site } from "../../types/Site";

import {
  createSite,
  deleteSite,
  getAllSites,
  updateSite,
} from "../../services/SiteService";

function SitePage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const [search, setSearch] = useState("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [siteToDelete, setSiteToDelete] = useState<number | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function showSnackbar(message: string, severity: "success" | "error") {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  }

  const loadSites = async () => {
    try {
      const data = await getAllSites();
      setSites(data);
    } catch {
      showSnackbar("Failed to load sites.", "error");
    }
  };
  useEffect(() => {
    const fetchSites = async () => {
      await loadSites();
    };

    void fetchSites();
  }, []);

  const handleAdd = () => {
    setSelectedSite(null);
    setOpenDialog(true);
  };

  const handleEdit = (site: Site) => {
    setSelectedSite(site);
    setOpenDialog(true);
  };

  const handleDelete = (id: number) => {
    setSiteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (siteToDelete === null) return;

    try {
      await deleteSite(siteToDelete);

      showSnackbar("Site deleted successfully", "success");

      await loadSites();
    } catch {
      showSnackbar("Failed to delete site", "error");
    } finally {
      setDeleteDialogOpen(false);
      setSiteToDelete(null);
    }
  };

  const handleSave = async (site: Site) => {
    try {
      if (selectedSite?.id) {
        await updateSite(selectedSite.id, site);
        showSnackbar("Site updated successfully", "success");
      } else {
        await createSite(site);
        showSnackbar("Site created successfully", "success");
      }

      setOpenDialog(false);
      setSelectedSite(null);
      loadSites();
    } catch {
      showSnackbar("Failed to save site", "error");
    }
  };

  const filteredSites = sites.filter((site) => {
    const keyword = search.toLowerCase();

    return (
      site.siteName.toLowerCase().includes(keyword) ||
      site.city.toLowerCase().includes(keyword) ||
      site.state.toLowerCase().includes(keyword) ||
      site.address.toLowerCase().includes(keyword)
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
            Sites
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage all customer sites and locations
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleAdd}
          sx={{
            borderRadius: 3,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Add Site
        </Button>
      </Box>

      <Box mb={3}>
        <SearchBar
          value={search}
          placeholder="Search Site..."
          onChange={(value) => {
            setSearch(value);
            setPage(0);
          }}
        />
      </Box>

      <SiteTable
        sites={filteredSites}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            fontSize: 24,
            pb: 1,
          }}
        >
          {selectedSite ? "Update Site" : "Add Site"}
        </DialogTitle>

        <DialogContent>
          <SiteForm
            site={selectedSite}
            onSave={handleSave}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Site"
        message="Are you sure you want to delete this site?"
        onClose={() => {
          setDeleteDialogOpen(false);
          setSiteToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      />
    </DashboardLayout>
  );
}

export default SitePage;
