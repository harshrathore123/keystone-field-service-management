import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";

import CustomerPortalService from "../../services/CustomerPortalService";
import { getAllSites } from "../../services/SiteService";

import type { WorkOrder } from "../../types/WorkOrder";
import type { Site } from "../../types/Site";

function CustomerPortalPage() {
  const [loading, setLoading] = useState(false);

  const [requests, setRequests] = useState<WorkOrder[]>([]);
  const [sites, setSites] = useState<Site[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [siteId, setSiteId] = useState<number | "">("");

  const loadData = async () => {
    try {
      setLoading(true);
      const requestData = await CustomerPortalService.getMyRequests();

      try {
        const response = await getAllSites();
        setSites(response);
      } catch (err) {
        console.error("SITE API ERROR =>", err);
      }

      setRequests(requestData);
    } catch (err) {
      console.error("REQUEST API ERROR =>", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await loadData();
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || siteId === "") {
      alert("Please fill all fields.");
      return;
    }

    await CustomerPortalService.raiseRequest({
      title,
      description,
      priority,
      siteId,
    });

    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setSiteId("");

    await loadData();
  };

  return (
    <DashboardLayout>
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Customer Portal
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Raise Service Request
                </Typography>

                <Stack spacing={2.5}>
                  <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    label="Description"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                  />

                  <TextField
                    select
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="LOW">LOW</MenuItem>

                    <MenuItem value="MEDIUM">MEDIUM</MenuItem>

                    <MenuItem value="HIGH">HIGH</MenuItem>

                    <MenuItem value="CRITICAL">CRITICAL</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Site"
                    value={siteId}
                    onChange={(e) => setSiteId(Number(e.target.value))}
                    fullWidth
                  >
                    {sites.map((site) => (
                      <MenuItem key={site.id} value={site.id}>
                        {site.siteName}
                      </MenuItem>
                    ))}
                  </TextField>

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                    }}
                  >
                    Submit Request
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              sx={{
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  My Requests
                </Typography>

                {loading ? (
                  <Box display="flex" justifyContent="center" py={6}>
                    <CircularProgress />
                  </Box>
                ) : requests.length === 0 ? (
                  <Typography color="text.secondary">
                    No service requests found.
                  </Typography>
                ) : (
                  <Stack spacing={2}>
                    {requests.map((request) => (
                      <Card
                        key={request.id}
                        variant="outlined"
                        sx={{
                          borderRadius: 3,
                        }}
                      >
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {request.title}
                          </Typography>

                          <Typography color="text.secondary" mb={1}>
                            {request.description}
                          </Typography>

                          <Typography>
                            <strong>Work Order:</strong>{" "}
                            {request.workOrderNumber}
                          </Typography>

                          <Typography>
                            <strong>Priority:</strong> {request.priority}
                          </Typography>

                          <Typography>
                            <strong>Status:</strong> {request.status}
                          </Typography>

                          <Typography>
                            <strong>Site:</strong> {request.siteName}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default CustomerPortalPage;
