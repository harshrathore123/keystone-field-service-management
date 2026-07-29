import { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import SiteForm from "./SiteForm";
import SiteTable from "./SiteTable";

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this site?")) return;

    try {
      await deleteSite(id);
      showSnackbar("Site deleted successfully", "success");
      loadSites();
    } catch {
      showSnackbar("Failed to delete site", "error");
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

  return (
    <DashboardLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Site Management
        </Typography>

        <Button variant="contained" onClick={handleAdd}>
          Add Site
        </Button>
      </Box>

      <SiteTable sites={sites} onEdit={handleEdit} onDelete={handleDelete} />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedSite ? "Edit Site" : "Add Site"}</DialogTitle>

        <DialogContent>
          <SiteForm
            site={selectedSite}
            onSave={handleSave}
            onCancel={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  );
}

export default SitePage;
