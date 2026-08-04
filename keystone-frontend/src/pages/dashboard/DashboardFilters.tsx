import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
} from "@mui/material";

interface DashboardFiltersProps {
  status: string;
  onStatusChange: (value: string) => void;
}

function DashboardFilters({ status, onStatusChange }: DashboardFiltersProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onStatusChange(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: 260,
          },
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Status</InputLabel>

          <Select value={status} label="Status" onChange={handleChange}>
            <MenuItem value="">All</MenuItem>

            <MenuItem value="NEW">New</MenuItem>

            <MenuItem value="ASSIGNED">Assigned</MenuItem>

            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>

            <MenuItem value="ON_HOLD">On Hold</MenuItem>

            <MenuItem value="COMPLETED">Completed</MenuItem>

            <MenuItem value="CLOSED">Closed</MenuItem>

            <MenuItem value="CANCELLED">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default DashboardFilters;
