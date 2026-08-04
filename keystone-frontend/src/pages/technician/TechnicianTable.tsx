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

import type { Technician } from "../../types/Technician";

interface TechnicianTableProps {
  technicians: Technician[];
  onEdit: (technician: Technician) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;

  onPageChange: (event: unknown, newPage: number) => void;

  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TechnicianTable({
  technicians,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: TechnicianTableProps) {
  const paginatedTechnicians = technicians.slice(
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
            minWidth: 1200,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Name",
                "Email",
                "Phone",
                "Role",
                "Status",
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
            {paginatedTechnicians.length === 0 ? (
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
                    No Technicians Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTechnicians.map((technician) => (
                <TableRow
                  key={technician.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {technician.id}
                  </TableCell>

                  <TableCell sx={{ minWidth: 200 }}>
                    {renderText(
                      `${technician.firstName} ${technician.lastName}`,
                      190,
                    )}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    {renderText(technician.email, 250)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>
                    {renderText(technician.phoneNumber, 140)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 130 }}>
                    <Chip
                      label={technician.role}
                      color={
                        technician.role === "ADMIN"
                          ? "secondary"
                          : "primary"
                      }
                      size="small"
                      sx={{
                        minWidth: 90,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ minWidth: 120 }}>
                    <Chip
                      label={technician.active ? "ACTIVE" : "INACTIVE"}
                      color={technician.active ? "success" : "error"}
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
                    <Tooltip title="Edit Technician">
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
                        onClick={() => onEdit(technician)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Technician">
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(technician.id!)}
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
        count={technicians.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default TechnicianTable;