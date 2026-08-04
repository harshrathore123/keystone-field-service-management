import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import { formatDate } from "../../utils/dateFormatter";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from "../../components/common/CustomPagination";

import type { WorkOrder } from "../../types/WorkOrder";

interface WorkOrderTableProps {
  workOrders: WorkOrder[];
  onEdit: (workOrder: WorkOrder) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;

  onPageChange: (event: unknown, newPage: number) => void;

  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function WorkOrderTable({
  workOrders,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: WorkOrderTableProps) {
  const paginatedOrders = workOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const renderText = (text?: string, width = 180) => (
    <Tooltip title={text || "-"}>
      <Typography
        noWrap
        sx={{
          maxWidth: width,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {text || "-"}
      </Typography>
    </Tooltip>
  );

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
        }}
      >
        <Table
          stickyHeader
          sx={{
            minWidth: 1700,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "ID",
                "WO Number",
                "Title",
                "Priority",
                "Status",
                "Customer",
                "Site",
                "Assigned Technician",
                "Scheduled Date",
                "SLA Date",
                "Active",
                "Actions",
              ].map((head) => (
                <TableCell
                  key={head}
                  align={
                    head === "Scheduled Date" ||
                    head === "SLA Date" ||
                    head === "Actions"
                      ? "center"
                      : "left"
                  }
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    fontSize: 14,
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12}>
                  <Box
                    sx={{
                      py: 5,
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    No Work Orders Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((workOrder) => (
                <TableRow
                  key={workOrder.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {workOrder.id}
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 160,
                      fontWeight: 700,
                    }}
                  >
                    {renderText(workOrder.workOrderNumber, 150)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 240 }}>
                    {renderText(workOrder.title, 230)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 120 }}>
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
                      sx={{
                        fontWeight: 700,
                        minWidth: 90,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ minWidth: 140 }}>
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
                      sx={{
                        fontWeight: 700,
                        minWidth: 120,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    {renderText(workOrder.customerName, 210)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    {renderText(workOrder.siteName, 210)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    {workOrder.assignedTechnicianName ? (
                      renderText(workOrder.assignedTechnicianName, 210)
                    ) : (
                      <Chip
                        label="Not Assigned"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ minWidth: 150 }}
                  >
                    {formatDate(workOrder.scheduledDate)}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ minWidth: 150 }}
                  >
                    {formatDate(workOrder.slaDate)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 100 }}>
                    <Chip
                      label={workOrder.active ? "ACTIVE" : "INACTIVE"}
                      color={workOrder.active ? "success" : "error"}
                      size="small"
                      sx={{
                        minWidth: 90,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 130,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Tooltip title="Edit Work Order">
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{
                          bgcolor: "#E3F2FD",
                          mr: 1,
                          "&:hover": {
                            bgcolor: "#BBDEFB",
                          },
                        }}
                        onClick={() => onEdit(workOrder)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Work Order">
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(workOrder.id!)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomPagination
        count={workOrders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default WorkOrderTable;