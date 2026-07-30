import { Button } from "@mui/material";
import GridOnIcon from "@mui/icons-material/GridOn";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const ReportExcel = ({ report }: Props) => {
  const exportExcel = () => {
    const data = [
      { Status: "Customers", Count: report.totalCustomers },
      { Status: "Sites", Count: report.totalSites },
      { Status: "Technicians", Count: report.totalTechnicians },
      { Status: "Work Orders", Count: report.totalWorkOrders },
      { Status: "New", Count: report.newWorkOrders },
      { Status: "Assigned", Count: report.assignedWorkOrders },
      { Status: "In Progress", Count: report.inProgressWorkOrders },
      { Status: "Completed", Count: report.completedWorkOrders },
      { Status: "On Hold", Count: report.onHoldWorkOrders },
      { Status: "Closed", Count: report.closedWorkOrders },
      { Status: "Cancelled", Count: report.cancelledWorkOrders },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer]),
      "Keystone_Report.xlsx"
    );
  };

  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<GridOnIcon />}
      onClick={exportExcel}
    >
      Export Excel
    </Button>
  );
};

export default ReportExcel;