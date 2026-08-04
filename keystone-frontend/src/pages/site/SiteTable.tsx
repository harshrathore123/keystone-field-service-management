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

import type { Site } from "../../types/Site";

interface SiteTableProps {
  sites: Site[];
  onEdit: (site: Site) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;

  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;

  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SiteTable({
  sites,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: SiteTableProps) {
  const paginatedSites = sites.slice(
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
            minWidth: 1350,
          }}
        >
          <TableHead>
            <TableRow>
              {[
                "ID",
                "Site Name",
                "Address",
                "City",
                "State",
                "Postal Code",
                "Customer",
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
            {paginatedSites.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <Box
                    sx={{
                      py: 5,
                      textAlign: "center",
                      color: "text.secondary",
                      fontWeight: 600,
                    }}
                  >
                    No Sites Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedSites.map((site) => (
                <TableRow
                  key={site.id}
                  hover
                  sx={{
                    transition: ".2s",
                    "&:hover": {
                      backgroundColor: "#f8f9fb",
                    },
                  }}
                >
                  <TableCell sx={{ minWidth: 70 }}>
                    {site.id}
                  </TableCell>

                  <TableCell sx={{ minWidth: 180 }}>
                    {renderText(site.siteName)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    {renderText(site.address, 250)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 140 }}>
                    {renderText(site.city, 130)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 140 }}>
                    {renderText(site.state, 130)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 140 }}>
                    {renderText(site.postalCode, 120)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 220 }}>
                    {renderText(site.customerName, 210)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 120 }}>
                    <Chip
                      label={site.active ? "ACTIVE" : "INACTIVE"}
                      color={site.active ? "success" : "error"}
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
                    <Tooltip title="Edit Site">
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
                        onClick={() => onEdit(site)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Site">
                      <IconButton
                        color="error"
                        size="small"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(site.id!)}
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
        count={sites.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default SiteTable;