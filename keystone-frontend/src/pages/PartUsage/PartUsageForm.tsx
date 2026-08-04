import { useEffect, useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { PartUsage } from "../../types/partUsage";
import type { Part } from "../../types/Part";
import type { WorkOrder } from "../../types/WorkOrder";

import { getAllParts } from "../../services/PartService";
import WorkOrderService from "../../services/WorkOrderService";

interface PartUsageFormProps {
  partUsage: PartUsage | null;
  onSave: (partUsage: PartUsage) => void;
  onCancel: () => void;
}

const initialState: PartUsage = {
  quantityUsed: 0,
  usedDate: "",
  remarks: "",
  workOrderId: 0,
  partId: 0,
};

function PartUsageForm({ partUsage, onSave, onCancel }: PartUsageFormProps) {
  const [formData, setFormData] = useState<PartUsage>(initialState);

  const [parts, setParts] = useState<Part[]>([]);

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  const [errors, setErrors] = useState({
    quantityUsed: "",
    usedDate: "",
    remarks: "",
    workOrderId: "",
    partId: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(partUsage ?? initialState);

      setErrors({
        quantityUsed: "",
        usedDate: "",
        remarks: "",
        workOrderId: "",
        partId: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [partUsage]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const [workOrderData, partData] = await Promise.all([
          WorkOrderService.getMyAssignedJobs(),
          getAllParts(),
        ]);

        setWorkOrders(workOrderData);
        setParts(partData);
      } catch (error) {
        console.error(error);
      }
    };

    void loadDropdowns();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "quantityUsed" || name === "workOrderId" || name === "partId"
          ? Number(value)
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    const selectedPart = parts.find((part) => part.id === formData.partId);

    const newErrors = {
      quantityUsed:
        formData.quantityUsed <= 0
          ? "Enter valid quantity"
          : selectedPart && formData.quantityUsed > selectedPart.quantityInStock
            ? "Quantity exceeds available stock"
            : "",

      usedDate: formData.usedDate.trim() === "" ? "Used Date is required" : "",

      remarks: formData.remarks.trim() === "" ? "Remarks are required" : "",

      workOrderId: formData.workOrderId > 0 ? "" : "Select Work Order",

      partId: formData.partId > 0 ? "" : "Select Part",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) {
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>
          {partUsage ? "Update Part Usage" : "Add Part Usage"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Record parts used for work orders
        </Typography>
      </Box>

      <Stack spacing={2.5}>
        <TextField
          label="Quantity Used"
          name="quantityUsed"
          type="number"
          fullWidth
          value={formData.quantityUsed}
          onChange={handleChange}
          error={!!errors.quantityUsed}
          helperText={errors.quantityUsed}
          inputProps={{ min: 1 }}
        />

        <TextField
          label="Used Date"
          name="usedDate"
          type="datetime-local"
          fullWidth
          value={formData.usedDate}
          onChange={handleChange}
          error={!!errors.usedDate}
          helperText={errors.usedDate}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Remarks"
          name="remarks"
          fullWidth
          value={formData.remarks}
          onChange={handleChange}
          error={!!errors.remarks}
          helperText={errors.remarks}
        />

        <TextField
          select
          label="Work Order"
          name="workOrderId"
          fullWidth
          value={formData.workOrderId}
          onChange={handleChange}
          error={!!errors.workOrderId}
          helperText={errors.workOrderId}
        >
          {workOrders
            .filter(
              (workOrder) =>
                workOrder.active && workOrder.status !== "COMPLETED",
            )
            .map((workOrder) => (
              <MenuItem key={workOrder.id} value={workOrder.id}>
                {workOrder.workOrderNumber} • {workOrder.title}
              </MenuItem>
            ))}
        </TextField>

        <TextField
          select
          label="Part"
          name="partId"
          fullWidth
          value={formData.partId}
          onChange={handleChange}
          error={!!errors.partId}
          helperText={errors.partId}
        >
          {parts
            .filter((part) => part.active && part.quantityInStock > 0)
            .map((part) => (
              <MenuItem key={part.id} value={part.id}>
                {part.partNumber} • {part.partName} ({part.quantityInStock} in
                stock)
              </MenuItem>
            ))}
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            sx={{
              borderRadius: 3,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              borderRadius: 3,
              px: 4,
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            {partUsage ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PartUsageForm;
