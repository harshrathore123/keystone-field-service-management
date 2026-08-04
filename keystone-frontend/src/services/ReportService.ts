import api from "../api/axios";
import type { ReportSummary } from "../types/ReportSummary";

const getReportSummary = async (): Promise<ReportSummary> => {
  const response = await api.get("/reports/summary");
  return response.data.data;
};

const ReportService = {
  getReportSummary,
};

export default ReportService;