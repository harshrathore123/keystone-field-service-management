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

import CustomPagination from "../../components/common/CustomPagination";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Part } from "../../types/Part";

interface PartTableProps {
  parts: Part[];
  onEdit: (part: Part) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PartTable({
  parts,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PartTableProps) {
  const paginatedParts = parts.slice(
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
            minWidth: 1300,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Part Name",
                "Part Number",
                "Category",
                "Stock",
                "Unit Price",
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
            {paginatedParts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Box
                    sx={{
                      py: 5,
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    No Parts Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedParts.map((part) => (
                <TableRow
                  key={part.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {part.id}
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    {renderText(part.partName, 210)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 170 }}>
                    {renderText(part.partNumber, 160)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 180 }}>
                    {renderText(part.category, 170)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>
                    <Typography fontWeight={600}>
                      {part.quantityInStock}
                    </Typography>

                    <Box mt={1}>
                      {part.quantityInStock === 0 ? (
                        <Chip
                          label="Out of Stock"
                          color="error"
                          size="small"
                        />
                      ) : part.quantityInStock <= 10 ? (
                        <Chip
                          label="Low Stock"
                          color="warning"
                          size="small"
                        />
                      ) : (
                        <Chip
                          label="In Stock"
                          color="success"
                          size="small"
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 150,
                      fontWeight: 700,
                    }}
                  >
                    ₹{" "}
                    {part.unitPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>

                  <TableCell sx={{ minWidth: 120 }}>
                    <Chip
                      label={part.active ? "ACTIVE" : "INACTIVE"}
                      color={part.active ? "success" : "error"}
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
                    <Tooltip title="Edit Part">
                      <IconButton
                        color="primary"
                        sx={{
                          bgcolor: "#E3F2FD",
                          mr: 1,
                          "&:hover": {
                            bgcolor: "#BBDEFB",
                          },
                        }}
                        onClick={() => onEdit(part)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Part">
                      <IconButton
                        color="error"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(part.id!)}
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
        count={parts.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default PartTable;