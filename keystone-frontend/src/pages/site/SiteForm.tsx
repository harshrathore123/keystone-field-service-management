import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";

import type { Site } from "../../types/Site";
import type { Customer } from "../../types/Customer";

import { getAllCustomers } from "../../services/CustomerService";

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

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [errors, setErrors] = useState({
    siteName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    customerId: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(site ?? initialState);

      setErrors({
        siteName: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        customerId: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [site]);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await getAllCustomers();
        setCustomers(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadCustomers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "customerId" ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
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

    const newErrors = {
      siteName: formData.siteName.trim() === "" ? "Site Name is required" : "",

      address: formData.address.trim() === "" ? "Address is required" : "",

      city: formData.city.trim() === "" ? "City is required" : "",

      state: formData.state.trim() === "" ? "State is required" : "",

      postalCode: /^\d{6}$/.test(formData.postalCode)
        ? ""
        : "Enter valid 6 digit postal code",

      customerId: formData.customerId > 0 ? "" : "Please select customer",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onSave(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Site Name"
            name="siteName"
            value={formData.siteName}
            onChange={handleChange}
            error={!!errors.siteName}
            helperText={errors.siteName}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            fullWidth
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
            inputProps={{
              maxLength: 6,
            }}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <TextField
            select
            fullWidth
            label="Customer"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            error={!!errors.customerId}
            helperText={errors.customerId}
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.customerName} ({customer.companyName})
              </MenuItem>
            ))}
          </TextField>
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
            <Button variant="outlined" color="inherit" onClick={onCancel}>
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
