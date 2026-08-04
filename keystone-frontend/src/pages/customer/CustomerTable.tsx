import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

import CustomPagination from "../../components/common/CustomPagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Customer } from "../../types/Customer";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomerTable({
  customers,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomerTableProps) {
  const paginatedCustomers = customers.slice(
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
                "Company",
                "Address",
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
            {paginatedCustomers.length === 0 ? (
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
                    No Customers Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {customer.id}
                  </TableCell>

                  <TableCell sx={{ minWidth: 180 }}>
                    {renderText(customer.customerName)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 240 }}>
                    {renderText(customer.email, 230)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>
                    {renderText(customer.phoneNumber, 140)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 200 }}>
                    {renderText(customer.companyName, 190)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    {renderText(customer.address, 250)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 120 }}>
                    <Chip
                      label={customer.active ? "ACTIVE" : "INACTIVE"}
                      color={customer.active ? "success" : "error"}
                      sx={{
                        fontWeight: 700,
                        minWidth: 90,
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
                    <Tooltip title="Edit Customer">
                      <IconButton
                        color="primary"
                        size="small"
                        sx={{
                          backgroundColor: "#E3F2FD",
                          mr: 1,
                          "&:hover": {
                            backgroundColor: "#BBDEFB",
                          },
                        }}
                        onClick={() => onEdit(customer)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Customer">
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          backgroundColor: "#FFEBEE",
                          "&:hover": {
                            backgroundColor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(customer.id!)}
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
        count={customers.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default CustomerTable;