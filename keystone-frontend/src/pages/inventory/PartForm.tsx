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

import type { Part } from "../../types/Part";

interface PartFormProps {
  part: Part | null;
  onSave: (part: Part) => void;
  onCancel: () => void;
}

const initialState: Part = {
  partName: "",
  partNumber: "",
  category: "",
  quantityInStock: 0,
  unitPrice: 0,
  active: true,
};

function PartForm({ part, onSave, onCancel }: PartFormProps) {
  const [formData, setFormData] = useState<Part>(initialState);

  const [errors, setErrors] = useState({
    partName: "",
    partNumber: "",
    category: "",
    quantityInStock: "",
    unitPrice: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(part ?? initialState);

      setErrors({
        partName: "",
        partNumber: "",
        category: "",
        quantityInStock: "",
        unitPrice: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [part]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantityInStock"
          ? Number(value)
          : name === "unitPrice"
            ? Number(value)
            : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      partName: formData.partName.trim() === "" ? "Part Name is required" : "",

      partNumber:
        formData.partNumber.trim() === "" ? "Part Number is required" : "",

      category: formData.category.trim() === "" ? "Category is required" : "",

      quantityInStock: formData.quantityInStock >= 0 ? "" : "Invalid Quantity",

      unitPrice: formData.unitPrice >= 0 ? "" : "Invalid Price",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>
          {part ? "Update Part" : "Add Part"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Manage inventory details and stock information
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <TextField
          label="Part Name"
          name="partName"
          fullWidth
          value={formData.partName}
          onChange={handleChange}
          error={!!errors.partName}
          helperText={errors.partName}
        />

        <TextField
          label="Part Number"
          name="partNumber"
          fullWidth
          value={formData.partNumber}
          onChange={handleChange}
          error={!!errors.partNumber}
          helperText={errors.partNumber}
        />

        <TextField
          label="Category"
          name="category"
          fullWidth
          value={formData.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
        />

        <TextField
          label="Quantity In Stock"
          name="quantityInStock"
          type="number"
          fullWidth
          value={formData.quantityInStock}
          onChange={handleChange}
          error={!!errors.quantityInStock}
          helperText={errors.quantityInStock}
          inputProps={{
            min: 0,
          }}
        />

        <TextField
          label="Unit Price"
          name="unitPrice"
          type="number"
          fullWidth
          value={formData.unitPrice}
          onChange={handleChange}
          error={!!errors.unitPrice}
          helperText={errors.unitPrice}
          inputProps={{
            min: 0,
            step: "0.01",
          }}
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
            {part ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PartForm;
