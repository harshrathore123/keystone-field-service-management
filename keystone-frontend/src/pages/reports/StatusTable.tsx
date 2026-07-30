import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const rows = (report: ReportSummary) => [
  { status: "New", count: report.newWorkOrders },
  { status: "Assigned", count: report.assignedWorkOrders },
  { status: "In Progress", count: report.inProgressWorkOrders },
  { status: "Completed", count: report.completedWorkOrders },
  { status: "On Hold", count: report.onHoldWorkOrders },
  { status: "Closed", count: report.closedWorkOrders },
  { status: "Cancelled", count: report.cancelledWorkOrders },
];

const StatusTable = ({ report }: Props) => {
  return (
    <Paper sx={{ mt: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Work Order Summary
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell align="right">
                <b>Total</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows(report).map((row) => (
              <TableRow key={row.status}>
                <TableCell>{row.status}</TableCell>

                <TableCell align="right">
                  {row.count}
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