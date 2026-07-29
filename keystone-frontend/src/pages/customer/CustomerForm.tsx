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

function CustomerForm({
  customer,
  onSave,
  onCancel,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<Customer>(initialState);

 useEffect(() => {
  void Promise.resolve().then(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData(initialState);
    }
  });
}, [customer]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.customerName.trim() ||
      !formData.email.trim() ||
      !formData.phoneNumber.trim() ||
      !formData.companyName.trim() ||
      !formData.address.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>

      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        {customer ? "Update Customer" : "Add Customer"}
      </Typography>

      <Stack spacing={3}>

        <TextField
          label="Customer Name"
          name="customerName"
          fullWidth
          value={formData.customerName}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        <TextField
          label="Company Name"
          name="companyName"
          fullWidth
          value={formData.companyName}
          onChange={handleChange}
        />

        <TextField
          label="Address"
          name="address"
          multiline
          rows={3}
          fullWidth
          value={formData.address}
          onChange={handleChange}
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

        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
        >
          <Button
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            {customer ? "Update" : "Save"}
          </Button>
        </Stack>

      </Stack>

    </Box>
  );
}

export default CustomerForm;