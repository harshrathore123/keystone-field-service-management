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
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Skill</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {technicians
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((technician) => (
              <TableRow key={technician.id} hover>
                <TableCell>{technician.id}</TableCell>

                <TableCell>
                  {technician.firstName} {technician.lastName}
                </TableCell>

                <TableCell>{technician.email}</TableCell>

                <TableCell>{technician.phoneNumber}</TableCell>

                <TableCell>{technician.role}</TableCell>

                <TableCell>
                  <Chip
                    label={technician.active ? "Active" : "Inactive"}
                    color={technician.active ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(technician)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(technician.id!)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <CustomPagination
        count={technicians.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
}

export default TechnicianTable;
