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

function PartForm({
  part,
  onSave,
  onCancel,
}: PartFormProps) {

  const [formData, setFormData] = useState<Part>(initialState);

  useEffect(() => {
  void Promise.resolve().then(() => {
    if (part) {
      setFormData(part);
    } else {
      setFormData(initialState);
    }
  });
}, [part]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

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
  };

  const handleSubmit = () => {
    if (
      !formData.partName.trim() ||
      !formData.partNumber.trim() ||
      !formData.category.trim()
    ) {
      alert("Please fill all required fields.");
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
        {part ? "Update Part" : "Add Part"}
      </Typography>

      <Stack spacing={3}>

        <TextField
          label="Part Name"
          name="partName"
          fullWidth
          value={formData.partName}
          onChange={handleChange}
        />

        <TextField
          label="Part Number"
          name="partNumber"
          fullWidth
          value={formData.partNumber}
          onChange={handleChange}
        />

        <TextField
          label="Category"
          name="category"
          fullWidth
          value={formData.category}
          onChange={handleChange}
        />

        <TextField
          label="Quantity In Stock"
          name="quantityInStock"
          type="number"
          fullWidth
          value={formData.quantityInStock}
          onChange={handleChange}
        />

        <TextField
          label="Unit Price"
          name="unitPrice"
          type="number"
          fullWidth
          value={formData.unitPrice}
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
            {part ? "Update" : "Save"}
          </Button>
        </Stack>

      </Stack>

    </Box>
  );
}

export default PartForm;