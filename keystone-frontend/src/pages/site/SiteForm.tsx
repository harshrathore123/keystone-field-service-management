import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";

import type { Site } from "../../types/Site";

interface SiteFormProps {
  site?: Site | null;
  onSave: (site: Site) => void;
  onCancel: () => void;
}

const initialState: Site = {
  siteName: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  active: true,
  customerId: 0,
};

function SiteForm({ site, onSave, onCancel }: SiteFormProps) {
  const [formData, setFormData] = useState<Site>(initialState);

  useEffect(() => {
    void Promise.resolve().then(() => {
      if (site) {
        setFormData(site);
      } else {
        setFormData(initialState);
      }
    });
  }, [site]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "customerId" ? Number(value) : value,
    }));
  };

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      active: e.target.checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Site Name"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            type="number"
            label="Customer ID"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Switch checked={formData.active} onChange={handleSwitch} />
            }
            label="Active"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>

            <Button variant="contained" type="submit">
              {site ? "Update" : "Save"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SiteForm;
