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

import { isAuthenticated, getUserRole } from "../utils/token";
import PartPage from "../pages/inventory/PartPage";
import ReportPage from "../pages/reports/ReportPage";

import NotificationPage from "../pages/notification/NotificationPage";
import PartUsagePage from "../pages/PartUsage/PartUsagePage";
import TimeLogPage from "../pages/TimeLog/TimeLogPage";
import ProfilePage from "../components/layout/ProfilePage";
import SettingsPage from "../pages/setting/SettingsPage";
import CustomerPortalPage from "../pages/customer/CustomerPortalPage";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(getUserRole() || "")) {
    return <Navigate to="/" replace />;
  }

  return children;
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
            <ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Customer */}
        <Route
          path="/customers"
          element={
            <ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER"]}>
              <CustomerPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerPortalPage />
            </ProtectedRoute>
          }
        />

        {/* Site */}
        <Route
          path="/sites"
          element={
            <ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER"]}>
              <SitePage />
            </ProtectedRoute>
          }
        />

        {/* Work Orders */}
        <Route
          path="/workorders"
          element={
            <ProtectedRoute allowedRoles={["MANAGER", "DISPATCHER"]}>
              <WorkOrderPage />
            </ProtectedRoute>
          }
        />

        {/* Technician Management */}
        <Route
          path="/technicians"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <TechnicianPage />
            </ProtectedRoute>
          }
        />

        {/* Technician Dashboard */}
        <Route
          path="/technician-dashboard"
          element={
            <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
              <TechnicianDashboard />
            </ProtectedRoute>
          }
        />

        {/* My Jobs */}
        <Route
          path="/my-jobs"
          element={
            <ProtectedRoute allowedRoles={["TECHNICIAN"]}>
              <MyJobsPage />
            </ProtectedRoute>
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN"]}
            >
              <PartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/part-usage"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN"]}
            >
              <PartUsagePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/time-logs"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN"]}
            >
              <TimeLogPage />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRoles={["MANAGER"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN", "CUSTOMER"]}
            >
              <NotificationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN", "CUSTOMER"]}
            >
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["MANAGER", "DISPATCHER", "TECHNICIAN", "CUSTOMER"]}
            >
              <ProfilePage />
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
