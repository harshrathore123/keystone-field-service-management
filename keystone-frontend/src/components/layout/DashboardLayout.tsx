import type { ReactNode } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F4F7FC",
      }}
    >
      <Sidebar />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopNavbar />

        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;