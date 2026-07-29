import {
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { WorkOrder } from "../../types/WorkOrder";

interface WorkOrderTableProps {
  workOrders: WorkOrder[];
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (id: number) => void;
}

function WorkOrderTable({ workOrders, onEdit, onDelete }: WorkOrderTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>

            <TableCell>WO Number</TableCell>

            <TableCell>Title</TableCell>

            <TableCell>Priority</TableCell>

            <TableCell>Status</TableCell>

            <TableCell>Customer</TableCell>

            <TableCell>Site</TableCell>

            <TableCell>Assigned User</TableCell>

            <TableCell>Scheduled Date</TableCell>

            <TableCell>SLA Date</TableCell>

            <TableCell>Active</TableCell>

            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {workOrders.map((workOrder) => (
            <TableRow key={workOrder.id} hover>
              <TableCell>{workOrder.id}</TableCell>

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
                        : workOrder.status === "CANCELLED"
                          ? "error"
                          : "primary"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell>{workOrder.customerId}</TableCell>

              <TableCell>{workOrder.siteId}</TableCell>

              <TableCell>{workOrder.assignedUserId ?? "-"}</TableCell>

              <TableCell>{workOrder.scheduledDate}</TableCell>

              <TableCell>{workOrder.slaDate}</TableCell>

              <TableCell>
                <Chip
                  label={workOrder.active ? "Active" : "Inactive"}
                  color={workOrder.active ? "success" : "error"}
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit(workOrder)}>
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(workOrder.id!)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WorkOrderTable;
