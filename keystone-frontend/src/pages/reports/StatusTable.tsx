import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { ChipProps } from "@mui/material/Chip";

import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const rows = (
  report: ReportSummary,
): {
  status: string;
  count: number;
  color: ChipProps["color"];
}[] => [
  {
    status: "New",
    count: report.newWorkOrders,
    color: "default",
  },
  {
    status: "Assigned",
    count: report.assignedWorkOrders,
    color: "info",
  },
  {
    status: "In Progress",
    count: report.inProgressWorkOrders,
    color: "warning",
  },
  {
    status: "Completed",
    count: report.completedWorkOrders,
    color: "success",
  },
  {
    status: "On Hold",
    count: report.onHoldWorkOrders,
    color: "secondary",
  },
  {
    status: "Closed",
    count: report.closedWorkOrders,
    color: "primary",
  },
  {
    status: "Cancelled",
    count: report.cancelledWorkOrders,
    color: "error",
  },
];

const StatusTable = ({ report }: Props) => {
  return (
    <Paper
      elevation={6}
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{
          px: 3,
          py: 2.5,
        }}
      >
        Work Order Summary
      </Typography>

      <TableContainer
        sx={{
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 450,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Status
              </TableCell>

              <TableCell
                align="right"
                sx={{
                  bgcolor: "#1976d2",
                  color: "#fff",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                Total
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows(report).map((row) => (
              <TableRow
                key={row.status}
                hover
                sx={{
                  transition: ".2s",
                  "&:hover": {
                    backgroundColor: "#f8f9fb",
                  },
                }}
              >
                <TableCell>
                  <Chip
                    label={row.status}
                    color={row.color}
                    size="small"
                    sx={{
                      minWidth: 120,
                      fontWeight: 700,
                    }}
                  />
                </TableCell>

                <TableCell align="right">
                  <Box
                    sx={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minWidth: 45,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      bgcolor: "#E3F2FD",
                      color: "#1976d2",
                      fontWeight: 700,
                    }}
                  >
                    {row.count}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StatusTable;
