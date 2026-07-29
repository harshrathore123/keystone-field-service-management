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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Customer } from "../../types/Customer";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: number) => void;
}

function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {customers.map((customer) => (

            <TableRow key={customer.id} hover>

              <TableCell>{customer.id}</TableCell>

              <TableCell>{customer.customerName}</TableCell>

              <TableCell>{customer.email}</TableCell>

              <TableCell>{customer.phoneNumber}</TableCell>

              <TableCell>{customer.companyName}</TableCell>

              <TableCell>{customer.address}</TableCell>

              <TableCell>
                <Chip
                  label={customer.active ? "Active" : "Inactive"}
                  color={customer.active ? "success" : "error"}
                  size="small"
                />
              </TableCell>

              <TableCell align="center">

                <IconButton
                  color="primary"
                  onClick={() => onEdit(customer)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => onDelete(customer.id!)}
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

export default CustomerTable;