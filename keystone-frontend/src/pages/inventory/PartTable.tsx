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
  TablePagination,
} from "@mui/material";

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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Part Name</TableCell>
            <TableCell>Part Number</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {parts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((part) => (
              <TableRow key={part.id} hover>
                <TableCell>{part.id}</TableCell>

                <TableCell>{part.partName}</TableCell>

                <TableCell>{part.partNumber}</TableCell>

                <TableCell>{part.category}</TableCell>

                <TableCell>
                  {part.quantityInStock}
                  <br />

                  {part.quantityInStock === 0 ? (
                    <Chip
                      label="Out of Stock"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  ) : part.quantityInStock <= 10 ? (
                    <Chip
                      label="Low Stock"
                      color="warning"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Chip
                      label="In Stock"
                      color="success"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </TableCell>

                <TableCell>
                  ₹{" "}
                  {part.unitPrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>

                <TableCell>
                  <Chip
                    label={part.active ? "Active" : "Inactive"}
                    color={part.active ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(part)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton color="error" onClick={() => onDelete(part.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={parts.length}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </TableContainer>
  );
}

export default PartTable;
