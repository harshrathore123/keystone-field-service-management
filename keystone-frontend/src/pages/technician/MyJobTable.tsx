import {
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { WorkOrder } from "../../types/WorkOrder";

interface MyJobsTableProps {
  workOrders: WorkOrder[];
  onStart: (id: number) => void;
  onPause: (id: number) => void;
  onResume: (id: number) => void;
  onComplete: (id: number) => void;
}

function MyJobsTable({
  workOrders,
  onStart,
  onPause,
  onResume,
  onComplete,
}: MyJobsTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>WO Number</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Scheduled Date</TableCell>
            <TableCell>SLA Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {workOrders.length > 0 ? (
            workOrders.map((workOrder) => (
              <TableRow key={workOrder.id} hover>
                <TableCell>{workOrder.workOrderNumber}</TableCell>

                <TableCell>{workOrder.title}</TableCell>

                <TableCell>
                  <Chip
                    label={workOrder.priority}
                    color={
                      workOrder.priority === "CRITICAL"
                        ? "error"
                        : workOrder.priority === "HIGH"
                        ? "warning"
                        : workOrder.priority === "MEDIUM"
                        ? "primary"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  <Chip
                    label={workOrder.status}
                    color={
                      workOrder.status === "COMPLETED"
                        ? "success"
                        : workOrder.status === "IN_PROGRESS"
                        ? "warning"
                        : workOrder.status === "ON_HOLD"
                        ? "secondary"
                        : "primary"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>{workOrder.scheduledDate ?? "-"}</TableCell>

                <TableCell>{workOrder.slaDate ?? "-"}</TableCell>

                <TableCell align="center">
                  {/* Start */}
                  {workOrder.status === "NEW" && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onStart(workOrder.id!)}
                    >
                      Start
                    </Button>
                  )}

                  {/* Pause + Complete */}
                  {workOrder.status === "IN_PROGRESS" && (
                    <>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => onPause(workOrder.id!)}
                      >
                        Pause
                      </Button>

                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => onComplete(workOrder.id!)}
                      >
                        Complete
                      </Button>
                    </>
                  )}

                  {/* Resume */}
                  {workOrder.status === "ON_HOLD" && (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => onResume(workOrder.id!)}
                    >
                      Resume
                    </Button>
                  )}

                  {/* Completed */}
                  {workOrder.status === "COMPLETED" && (
                    <Chip
                      label="Completed"
                      color="success"
                      size="small"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No assigned jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyJobsTable;