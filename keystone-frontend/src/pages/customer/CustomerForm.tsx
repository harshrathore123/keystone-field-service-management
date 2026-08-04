import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type { Customer } from "../../types/Customer";

interface CustomerFormProps {
  customer: Customer | null;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

const initialState: Customer = {
  customerName: "",
  email: "",
  phoneNumber: "",
  companyName: "",
  address: "",
  active: true,
};

function CustomerForm({ customer, onSave, onCancel }: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>(initialState);

  const [errors, setErrors] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    address: "",
  });

  useEffect(() => {
    queueMicrotask(() => {
      setFormData(customer ?? initialState);

      setErrors({
        customerName: "",
        email: "",
        phoneNumber: "",
        companyName: "",
        address: "",
      });
    });
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      customerName:
        formData.customerName.trim() === "" ? "Customer Name is required" : "",

      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? ""
        : "Enter a valid email",

      phoneNumber: /^\d{10}$/.test(formData.phoneNumber)
        ? ""
        : "Enter a valid 10 digit phone number",

      companyName:
        formData.companyName.trim() === "" ? "Company Name is required" : "",

      address: formData.address.trim() === "" ? "Address is required" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {customer ? "Update Customer" : "Add Customer"}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Customer Name"
          name="customerName"
          fullWidth
          value={formData.customerName}
          onChange={handleChange}
          error={!!errors.customerName}
          helperText={errors.customerName}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          inputProps={{
            maxLength: 10,
          }}
        />

        <TextField
          label="Company Name"
          name="companyName"
          fullWidth
          value={formData.companyName}
          onChange={handleChange}
          error={!!errors.companyName}
          helperText={errors.companyName}
        />

        <TextField
          label="Address"
          name="address"
          multiline
          rows={3}
          fullWidth
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.active}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  active: e.target.checked,
                }))
              }
            />
          }
          label="Active"
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" color="inherit" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {customer ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default CustomerForm;
