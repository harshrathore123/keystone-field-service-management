import {
  Box,
  Button,
  Chip,
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
  const renderText = (text?: string, width = 220) => (
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
            minWidth: 1300,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "WO Number",
                "Title",
                "Priority",
                "Status",
                "Scheduled Date",
                "SLA Date",
                "Action",
              ].map((head) => (
                <TableCell
                  key={head}
                  align={head === "Action" ? "center" : "left"}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {workOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box
                    sx={{
                      py: 6,
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    No Assigned Jobs Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              workOrders.map((workOrder) => (
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
                  <TableCell
                    sx={{
                      minWidth: 170,
                      fontWeight: 700,
                    }}
                  >
                    {renderText(workOrder.workOrderNumber, 160)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 280 }}>
                    {renderText(workOrder.title, 270)}
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
                        minWidth: 90,
                        fontWeight: 700,
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
                          : workOrder.status === "ON_HOLD"
                          ? "secondary"
                          : "primary"
                      }
                      size="small"
                      sx={{
                        minWidth: 120,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 170,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {workOrder.scheduledDate ?? "-"}
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 170,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {workOrder.slaDate ?? "-"}
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 260,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {workOrder.status === "ASSIGNED" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          minWidth: 90,
                        }}
                        onClick={() => onStart(workOrder.id!)}
                      >
                        Start
                      </Button>
                    )}

                    {workOrder.status === "IN_PROGRESS" && (
                      <>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            mr: 1,
                            minWidth: 90,
                          }}
                          onClick={() => onPause(workOrder.id!)}
                        >
                          Pause
                        </Button>

                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            minWidth: 100,
                            fontWeight: 600,
                          }}
                          onClick={() => onComplete(workOrder.id!)}
                        >
                          Complete
                        </Button>
                      </>
                    )}

                    {workOrder.status === "ON_HOLD" && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          minWidth: 100,
                        }}
                        onClick={() => onResume(workOrder.id!)}
                      >
                        Resume
                      </Button>
                    )}

                    {workOrder.status === "COMPLETED" && (
                      <Chip
                        label="Completed"
                        color="success"
                        sx={{
                          minWidth: 110,
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MyJobsTable;