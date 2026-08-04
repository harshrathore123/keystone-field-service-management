import { useEffect, useMemo, useState } from "react";

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

import { getAllCustomers } from "../../services/CustomerService";
import { getAllSites } from "../../services/SiteService";
import { getAllTechnicians } from "../../services/TechnicianService";

import type { Customer } from "../../types/Customer";
import type { Site } from "../../types/Site";
import type { Technician } from "../../types/Technician";
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
  customerId: "",
  siteId: "",
  assignedUserId: null,
};

function WorkOrderForm({ workOrder, onSave, onCancel }: WorkOrderFormProps) {
  const [formData, setFormData] = useState<WorkOrder>(initialState);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [sites, setSites] = useState<Site[]>([]);

  const [technicians, setTechnicians] = useState<Technician[]>([]);

  const [errors, setErrors] = useState({
    workOrderNumber: "",
    title: "",
    description: "",
    scheduledDate: "",
    slaDate: "",
    customerId: "",
    siteId: "",
  });

  useEffect(() => {
    const id = setTimeout(() => {
      setFormData(workOrder ?? initialState);

      setErrors({
        workOrderNumber: "",
        title: "",
        description: "",
        scheduledDate: "",
        slaDate: "",
        customerId: "",
        siteId: "",
      });
    }, 0);

    return () => clearTimeout(id);
  }, [workOrder]);

  useEffect(() => {
    const loadDropdowns = async () => {
      try {
        const customerData = await getAllCustomers();
        const siteData = await getAllSites();

        setCustomers(customerData);
        setSites(siteData);

        try {
          const technicianData = await getAllTechnicians();
          setTechnicians(technicianData);
        } catch (error) {
          console.error("Technician API Error", error);
          setTechnicians([]);
        }
      } catch (error) {
        console.error("Customer/Site API Error", error);
      }
    };

    void loadDropdowns();
  }, []);

  const filteredSites = useMemo(() => {
    return sites.filter(
      (site) => site.customerId === Number(formData.customerId),
    );
  }, [sites, formData.customerId]);
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = () => {
    const newErrors = {
      workOrderNumber:
        formData.workOrderNumber.trim() === ""
          ? "Work Order Number is required"
          : "",

      title: formData.title.trim() === "" ? "Title is required" : "",

      description:
        formData.description.trim() === "" ? "Description is required" : "",

      scheduledDate:
        formData.scheduledDate === "" ? "Scheduled Date is required" : "",

      slaDate: formData.slaDate === "" ? "SLA Date is required" : "",

      customerId:
        Number(formData.customerId) > 0 ? "" : "Please select customer",

      siteId: Number(formData.siteId) > 0 ? "" : "Please select site",
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
        {workOrder ? "Update Work Order" : "Add Work Order"}
      </Typography>

      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Work Order Number"
          name="workOrderNumber"
          value={formData.workOrderNumber}
          onChange={handleTextChange}
          error={!!errors.workOrderNumber}
          helperText={errors.workOrderNumber}
        />

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleTextChange}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          error={!!errors.description}
          helperText={errors.description}
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>

          <Select
            name="priority"
            label="Priority"
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
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleSelectChange}
          >
            <MenuItem value="NEW">NEW</MenuItem>
            <MenuItem value="ASSIGNED">ASSIGNED</MenuItem>
            <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
            <MenuItem value="ON_HOLD">ON HOLD</MenuItem>
            <MenuItem value="COMPLETED">COMPLETED</MenuItem>
            <MenuItem value="CANCELLED">CANCELLED</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          type="datetime-local"
          label="Scheduled Date"
          name="scheduledDate"
          value={formData.scheduledDate}
          onChange={handleTextChange}
          error={!!errors.scheduledDate}
          helperText={errors.scheduledDate}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          type="datetime-local"
          label="SLA Date"
          name="slaDate"
          value={formData.slaDate}
          onChange={handleTextChange}
          error={!!errors.slaDate}
          helperText={errors.slaDate}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          select
          fullWidth
          label="Customer"
          name="customerId"
          value={formData.customerId || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              customerId: Number(e.target.value),
              siteId: 0,
            }))
          }
          error={!!errors.customerId}
          helperText={errors.customerId}
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.companyName} • {customer.customerName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Site"
          name="siteId"
          value={formData.siteId || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              siteId: Number(e.target.value),
            }))
          }
          error={!!errors.siteId}
          helperText={errors.siteId}
        >
          {filteredSites.map((site) => (
            <MenuItem key={site.id} value={site.id}>
              {site.siteName}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label="Technician"
          value={formData.assignedUserId ?? ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              assignedUserId: e.target.value ? Number(e.target.value) : null,
            }))
          }
        >
          <MenuItem value="">Unassigned</MenuItem>

          {technicians.map((technician) => (
            <MenuItem key={technician.id} value={technician.id}>
              {technician.firstName} {technician.lastName}
            </MenuItem>
          ))}
        </TextField>

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
            {workOrder ? "Update" : "Save"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default WorkOrderForm;
