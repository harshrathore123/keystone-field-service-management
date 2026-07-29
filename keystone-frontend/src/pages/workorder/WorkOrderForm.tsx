import { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

import type { WorkOrder } from "../../types/WorkOrder";

interface WorkOrderFormProps {
  workOrder: WorkOrder | null;
  onSave: (workOrder: WorkOrder) => void;
  onCancel: () => void;
}

const initialState: WorkOrder = {
  workOrderNumber: "",
  title: "",
  description: "",
  priority: "MEDIUM",
  status: "NEW",
  scheduledDate: "",
  slaDate: "",
  active: true,
  customerId: 0,
  siteId: 0,
  assignedUserId: null,
};

function WorkOrderForm({ workOrder, onSave, onCancel }: WorkOrderFormProps) {
  const [formData, setFormData] = useState<WorkOrder>(initialState);

  useEffect(() => {
    void Promise.resolve().then(() => {
      if (workOrder) {
        setFormData(workOrder);
      } else {
        setFormData(initialState);
      }
    });
  }, [workOrder]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      !formData.workOrderNumber.trim() ||
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.scheduledDate.trim() ||
      !formData.slaDate.trim() ||
      formData.customerId <= 0 ||
      formData.siteId <= 0
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSave(formData);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {workOrder ? "Update Work Order" : "Add Work Order"}
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Work Order Number"
          name="workOrderNumber"
          fullWidth
          value={formData.workOrderNumber}
          onChange={handleTextChange}
        />

        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleTextChange}
        />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={3}
          fullWidth
          value={formData.description}
          onChange={handleTextChange}
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>

          <Select
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleSelectChange}
          >
            <MenuItem value="LOW">LOW</MenuItem>

            <MenuItem value="MEDIUM">MEDIUM</MenuItem>

            <MenuItem value="HIGH">HIGH</MenuItem>

            <MenuItem value="CRITICAL">CRITICAL</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>

          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
          >
            <MenuItem value="NEW">NEW</MenuItem>

            <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>

            <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>

            <MenuItem value="COMPLETED">COMPLETED</MenuItem>

            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Scheduled Date"
          name="scheduledDate"
          type="datetime-local"
          fullWidth
          value={formData.scheduledDate}
          onChange={handleTextChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="SLA Date"
          name="slaDate"
          type="datetime-local"
          fullWidth
          value={formData.slaDate}
          onChange={handleTextChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Customer ID"
          name="customerId"
          type="number"
          fullWidth
          value={formData.customerId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              customerId: Number(e.target.value),
            }))
          }
        />

        <TextField
          label="Site ID"
          name="siteId"
          type="number"
          fullWidth
          value={formData.siteId}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              siteId: Number(e.target.value),
            }))
          }
        />

        <TextField
          label="Assigned User ID"
          name="assignedUserId"
          type="number"
          fullWidth
          value={formData.assignedUserId ?? ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              assignedUserId: e.target.value ? Number(e.target.value) : null,
            }))
          }
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
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit}>
            {workOrder ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default WorkOrderForm;
