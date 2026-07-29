import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import type { ReactNode } from "react";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

import CustomerPage from "../pages/customer/CustomerPage";
import SitePage from "../pages/site/SitePage";
import WorkOrderPage from "../pages/workorder/WorkOrderPage";

import { isAuthenticated } from "../utils/token";

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
        {/* Public Route */}
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

        {/* Sites */}
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

        {/* Technicians */}
        <Route
          path="/technicians"
          element={
            <ProtectedRoute>
              <div>Technician Module Coming Soon</div>
            </ProtectedRoute>
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <div>Inventory Module Coming Soon</div>
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <div>Reports Module Coming Soon</div>
            </ProtectedRoute>
          }
        />

        {/* Invalid Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
