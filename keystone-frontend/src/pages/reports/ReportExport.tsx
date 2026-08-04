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

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("KEYSTONE - REPORT SUMMARY", 14, 20);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleString("en-IN")}`, 14, 28);

    autoTable(doc, {
      theme: "grid",
      startY: 30,
      head: [["Status", "Count"]],
      headStyles: {
        fillColor: [25, 118, 210],
        textColor: 255,
        fontStyle: "bold",
      },
      styles: {
        halign: "center",
        fontSize: 10,
      },
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

    doc.save(`Keystone_Report_${new Date().toISOString().split("T")[0]}.pdf`);
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<PictureAsPdfIcon />}
      onClick={exportPdf}
      sx={{
        borderRadius: 3,
        px: 3,
        textTransform: "none",
        fontWeight: 600,
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      Export PDF
    </Button>
  );
};

export default ReportExport;
