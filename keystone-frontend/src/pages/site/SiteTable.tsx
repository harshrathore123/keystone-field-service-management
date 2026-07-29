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

import type { Site } from "../../types/Site";

interface SiteTableProps {
  sites: Site[];
  onEdit: (site: Site) => void;
  onDelete: (id: number) => void;
}

function SiteTable({
  sites,
  onEdit,
  onDelete,
}: SiteTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>ID</strong>
            </TableCell>

            <TableCell>
              <strong>Site Name</strong>
            </TableCell>

            <TableCell>
              <strong>Address</strong>
            </TableCell>

            <TableCell>
              <strong>City</strong>
            </TableCell>

            <TableCell>
              <strong>State</strong>
            </TableCell>

            <TableCell>
              <strong>Postal Code</strong>
            </TableCell>

            <TableCell>
              <strong>Customer ID</strong>
            </TableCell>

            <TableCell>
              <strong>Status</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Actions</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sites.length > 0 ? (
            sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.id}</TableCell>

                <TableCell>{site.siteName}</TableCell>

                <TableCell>{site.address}</TableCell>

                <TableCell>{site.city}</TableCell>

                <TableCell>{site.state}</TableCell>

                <TableCell>{site.postalCode}</TableCell>

                <TableCell>{site.customerId}</TableCell>

                <TableCell>
                  <Chip
                    label={site.active ? "Active" : "Inactive"}
                    color={site.active ? "success" : "error"}
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(site)}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => onDelete(site.id!)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                align="center"
              >
                No Sites Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SiteTable;