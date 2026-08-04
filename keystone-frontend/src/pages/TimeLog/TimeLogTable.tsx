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

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomPagination from "../../components/common/CustomPagination";

import type { TimeLog } from "../../types/timeLog";

interface TimeLogTableProps {
  timeLogs: TimeLog[];
  onEdit: (timeLog: TimeLog) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;

  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;

  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TimeLogTable({
  timeLogs,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: TimeLogTableProps) {
  const paginatedTimeLogs = timeLogs.slice(
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
            minWidth: 1450,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Start Time",
                "End Time",
                "Hours Worked",
                "Work Description",
                "Work Order",
                "Actions",
              ].map((head) => (
                <TableCell
                  key={head}
                  align={head === "Actions" ? "center" : "left"}
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
            {paginatedTimeLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <Box
                    sx={{
                      py: 5,
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    No Time Logs Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTimeLogs.map((timeLog) => (
                <TableRow
                  key={timeLog.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {timeLog.id}
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 170,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {timeLog.startTime}
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 170,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {timeLog.endTime}
                  </TableCell>

                  <TableCell sx={{ minWidth: 140 }}>
                    <Chip
                      label={`${timeLog.hoursWorked} hrs`}
                      color="primary"
                      size="small"
                      sx={{
                        minWidth: 90,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ minWidth: 280 }}>
                    {renderText(timeLog.workDescription, 270)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    <Tooltip
                      title={`${timeLog.workOrderNumber} - ${timeLog.workOrderTitle}`}
                    >
                      <Box>
                        <Typography fontWeight={700} noWrap>
                          {timeLog.workOrderNumber}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {timeLog.workOrderTitle}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      minWidth: 130,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Tooltip title="Edit Time Log">
                      <IconButton
                        color="primary"
                        sx={{
                          bgcolor: "#E3F2FD",
                          mr: 1,
                          "&:hover": {
                            bgcolor: "#BBDEFB",
                          },
                        }}
                        onClick={() => onEdit(timeLog)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Time Log">
                      <IconButton
                        color="error"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(timeLog.id!)}
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
        count={timeLogs.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default TimeLogTable;