import { Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { ReportSummary } from "../../types/ReportSummary";

interface Props {
  report: ReportSummary;
}

const ReportExport = ({ report }: Props) => {
  const exportPdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("KEYSTONE REPORT", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Status", "Count"]],
      body: [
        ["Customers", report.totalCustomers],
        ["Sites", report.totalSites],
        ["Technicians", report.totalTechnicians],
        ["Work Orders", report.totalWorkOrders],
        ["New", report.newWorkOrders],
        ["Assigned", report.assignedWorkOrders],
        ["In Progress", report.inProgressWorkOrders],
        ["Completed", report.completedWorkOrders],
        ["On Hold", report.onHoldWorkOrders],
        ["Closed", report.closedWorkOrders],
        ["Cancelled", report.cancelledWorkOrders],
      ],
    });

    doc.save("Keystone_Report.pdf");
  };

  return (
    <Button
      variant="contained"
      startIcon={<PictureAsPdfIcon />}
      onClick={exportPdf}
    >
      Export PDF
    </Button>
  );
};

export default ReportExport;