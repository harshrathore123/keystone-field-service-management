import { useEffect, useState } from "react";

import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type { TimeLog } from "../../types/timeLog";
import type { WorkOrder } from "../../types/WorkOrder";

import WorkOrderService from "../../services/WorkOrderService";

interface TimeLogFormProps {
  timeLog: TimeLog | null;
  onSave: (timeLog: TimeLog) => void;
  onCancel: () => void;
}

const initialState: TimeLog = {
  startTime: "",
  endTime: "",
  hoursWorked: 0,
  workDescription: "",
  workOrderId: 0,
};

function TimeLogForm({ timeLog, onSave, onCancel }: TimeLogFormProps) {
  const [formData, setFormData] = useState<TimeLog>(initialState);

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);

  const [errors, setErrors] = useState({
    startTime: "",
    endTime: "",
    hoursWorked: "",
    workDescription: "",
    workOrderId: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(timeLog ?? initialState);

      setErrors({
        startTime: "",
        endTime: "",
        hoursWorked: "",
        workDescription: "",
        workOrderId: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [timeLog]);

  useEffect(() => {
    const loadWorkOrders = async () => {
      try {
        const data = await WorkOrderService.getMyAssignedJobs();

        setWorkOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadWorkOrders();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "hoursWorked" || name === "workOrderId"
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
      startTime:
        formData.startTime.trim() === "" ? "Start Time is required" : "",

      endTime: formData.endTime.trim() === "" ? "End Time is required" : "",

      hoursWorked: formData.hoursWorked > 0 ? "" : "Enter valid hours",

      workDescription:
        formData.workDescription.trim() === ""
          ? "Work Description is required"
          : "",

      workOrderId: formData.workOrderId > 0 ? "" : "Select Work Order",
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
          {timeLog ? "Update Time Log" : "Add Time Log"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Track technician working hours for work orders
        </Typography>
      </Box>

      <Stack spacing={3}>
        <TextField
          label="Start Time"
          name="startTime"
          type="time"
          fullWidth
          value={formData.startTime}
          onChange={handleChange}
          error={!!errors.startTime}
          helperText={errors.startTime}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="End Time"
          name="endTime"
          type="time"
          fullWidth
          value={formData.endTime}
          onChange={handleChange}
          error={!!errors.endTime}
          helperText={errors.endTime}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Hours Worked"
          name="hoursWorked"
          type="number"
          fullWidth
          value={formData.hoursWorked}
          onChange={handleChange}
          error={!!errors.hoursWorked}
          helperText={errors.hoursWorked}
          inputProps={{
            min: 0,
            step: 0.5,
          }}
        />

        <TextField
          label="Work Description"
          name="workDescription"
          multiline
          rows={3}
          fullWidth
          value={formData.workDescription}
          onChange={handleChange}
          error={!!errors.workDescription}
          helperText={errors.workDescription}
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
                {workOrder.workOrderNumber}
                {" • "}
                {workOrder.title}
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
              px: 4,
              textTransform: "none",
              fontWeight: 600,
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
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            {timeLog ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default TimeLogForm;
