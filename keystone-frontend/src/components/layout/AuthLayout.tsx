import { Box, Grid, Typography } from "@mui/material";
import type { ReactNode } from "react";
import logo from "../../assets/images/keystone-logo.png";

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {/* Left Section */}
      <Grid
        size={{ xs: 0, md: 7 }}
        sx={{
          display: { xs: "none", md: "flex" },
          background: "linear-gradient(135deg, #1565C0 0%, #26A69A 100%)",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 8,
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="KEYSTONE Logo"
          sx={{
            width: 320,
            mb: 4,
          }}
        />

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 2,
          }}
        >
          Field Service Management Platform
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: 500,
            textAlign: "center",
            opacity: 0.9,
          }}
        >
          Smart Workforce.
          <br />
          Better Service.
          <br />
          Manage work orders, technicians, customers and inventory through one
          powerful enterprise platform.
        </Typography>
      </Grid>

      {/* Right Section */}
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EEF3F8",
          p: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 430,
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AuthLayout;
