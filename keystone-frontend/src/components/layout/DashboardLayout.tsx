import { useState } from "react";
import type { ReactNode } from "react";
import { Box } from "@mui/material";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "stretch",
        bgcolor: "#F4F7FC",
      }}
    >
      <Sidebar collapsed={collapsed} />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <TopNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

        <Box
          sx={{
            flex: 1,
            p: 3,
            overflowY: "visible",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
