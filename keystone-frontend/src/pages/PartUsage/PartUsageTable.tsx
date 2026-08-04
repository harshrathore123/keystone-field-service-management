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

import type { PartUsage } from "../../types/partUsage";

interface Props {
  partUsages: PartUsage[];
  onEdit: (partUsage: PartUsage) => void;
  onDelete: (id: number) => void;

  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
  ) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PartUsageTable = ({
  partUsages,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) => {
  const paginatedPartUsage = partUsages.slice(
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
                "Quantity Used",
                "Used Date",
                "Remarks",
                "Work Order",
                "Part",
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
            {paginatedPartUsage.length === 0 ? (
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
                    No Part Usage Records Found
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              paginatedPartUsage.map((item) => (
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
                  <TableCell sx={{ minWidth: 70 }}>
                    {item.id}
                  </TableCell>

                  <TableCell sx={{ minWidth: 150 }}>
                    <Chip
                      label={`${item.quantityUsed} Used`}
                      color="warning"
                      size="small"
                      sx={{
                        minWidth: 100,
                        fontWeight: 700,
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      minWidth: 180,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(item.usedDate).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    {renderText(item.remarks, 250)}
                  </TableCell>

                  <TableCell sx={{ minWidth: 260 }}>
                    <Tooltip
                      title={`${item.workOrderNumber} - ${item.workOrderTitle}`}
                    >
                      <Box>
                        <Typography fontWeight={700} noWrap>
                          {item.workOrderNumber}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {item.workOrderTitle}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>

                  <TableCell sx={{ minWidth: 240 }}>
                    <Tooltip
                      title={`${item.partNumber} - ${item.partName}`}
                    >
                      <Box>
                        <Typography fontWeight={700} noWrap>
                          {item.partNumber}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {item.partName}
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
                    <Tooltip title="Edit Part Usage">
                      <IconButton
                        color="primary"
                        sx={{
                          bgcolor: "#E3F2FD",
                          mr: 1,
                          "&:hover": {
                            bgcolor: "#BBDEFB",
                          },
                        }}
                        onClick={() => onEdit(item)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete Part Usage">
                      <IconButton
                        color="error"
                        sx={{
                          bgcolor: "#FFEBEE",
                          "&:hover": {
                            bgcolor: "#FFCDD2",
                          },
                        }}
                        onClick={() => onDelete(item.id!)}
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
        count={partUsages.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default PartUsageTable;