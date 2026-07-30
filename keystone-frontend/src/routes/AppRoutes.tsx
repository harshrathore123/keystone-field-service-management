import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

import CustomerPage from "../pages/customer/CustomerPage";
import SitePage from "../pages/site/SitePage";
import WorkOrderPage from "../pages/workorder/WorkOrderPage";

import TechnicianPage from "../pages/technician/TechnicianPage";
import TechnicianDashboard from "../pages/technician/TechnicianDashboard";
import MyJobsPage from "../pages/technician/MyJobsPage";

import { isAuthenticated } from "../utils/token";
import PartPage from "../pages/inventory/PartPage";
import ReportPage from "../pages/reports/ReportPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <CustomerPage />
            </ProtectedRoute>
          }
        />

        {/* Site */}
        <Route
          path="/sites"
          element={
            <ProtectedRoute>
              <SitePage />
            </ProtectedRoute>
          }
        />

        {/* Work Orders */}
        <Route
          path="/workorders"
          element={
            <ProtectedRoute>
              <WorkOrderPage />
            </ProtectedRoute>
          }
        />

        {/* Technician Management */}
        <Route
          path="/technicians"
          element={
            <ProtectedRoute>
              <TechnicianPage />
            </ProtectedRoute>
          }
        />

        {/* Technician Dashboard */}
        <Route
          path="/technician-dashboard"
          element={
            <ProtectedRoute>
              <TechnicianDashboard />
            </ProtectedRoute>
          }
        />

        {/* My Jobs */}
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobsPage />
            </ProtectedRoute>
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <PartPage/>
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportPage/>
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;