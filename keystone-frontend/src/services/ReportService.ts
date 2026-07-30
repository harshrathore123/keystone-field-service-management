import axios from "axios";
import type { ReportSummary } from "../types/ReportSummary";
import { getToken } from "../utils/token";

const API_URL = "http://localhost:8080/api/reports";

const getReportSummary = async (): Promise<ReportSummary> => {
  const response = await axios.get(`${API_URL}/summary`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data.data;
};

const ReportService = {
  getReportSummary,
};

export default ReportService;