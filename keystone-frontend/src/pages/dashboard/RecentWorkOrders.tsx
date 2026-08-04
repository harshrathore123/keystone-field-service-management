import {
  Box,
  Card,
  CardContent,
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

interface Props {
  workOrders: WorkOrder[];
}

function RecentWorkOrders({ workOrders }: Props) {
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
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Recent Work Orders
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            overflowX: "auto",
            borderRadius: 2,
          }}
        >
          <Table
            stickyHeader
            sx={{
              minWidth: 800,
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
                  WO No.
                </TableCell>

                <TableCell
                  sx={{
                    bgcolor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Title
                </TableCell>

                <TableCell
                  sx={{
                    bgcolor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  Priority
                </TableCell>

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
              </TableRow>
            </TableHead>

            <TableBody>
              {workOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box
                      sx={{
                        py: 5,
                        textAlign: "center",
                        color: "text.secondary",
                        fontWeight: 600,
                      }}
                    >
                      No Recent Work Orders
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                workOrders.map((item) => (
                  <TableRow
                    key={item.id}
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
                      {renderText(item.workOrderNumber, 160)}
                    </TableCell>

                    <TableCell sx={{ minWidth: 320 }}>
                      {renderText(item.title, 300)}
                    </TableCell>

                    <TableCell sx={{ minWidth: 130 }}>
                      <Chip
                        label={item.priority}
                        size="small"
                        color={
                          item.priority === "CRITICAL"
                            ? "error"
                            : item.priority === "HIGH"
                              ? "warning"
                              : item.priority === "MEDIUM"
                                ? "primary"
                                : "success"
                        }
                        sx={{
                          minWidth: 90,
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ minWidth: 150 }}>
                      <Chip
                        label={item.status}
                        size="small"
                        color={
                          item.status === "COMPLETED"
                            ? "success"
                            : item.status === "IN_PROGRESS"
                              ? "warning"
                              : item.status === "ON_HOLD"
                                ? "secondary"
                                : "primary"
                        }
                        sx={{
                          minWidth: 120,
                          fontWeight: 700,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default RecentWorkOrders;
