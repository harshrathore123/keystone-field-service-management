import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";

import { useLocation } from "react-router-dom";

function TopNavbar() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/customers":
        return "Customers";
      case "/sites":
        return "Sites";
      case "/workorders":
        return "Work Orders";
      case "/technicians":
        return "Technicians";
      case "/technician-dashboard":
        return "Technician Dashboard";
      case "/my-jobs":
        return "My Jobs";
      case "/inventory":
        return "Inventory";
      case "/reports":
        return "Reports";
      default:
        return "KEYSTONE";
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#ffffff",
        color: "#000",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar>
        <IconButton>
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ ml: 2 }}
        >
          {getTitle()}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton sx={{ mx: 1 }}>
          <SettingsIcon />
        </IconButton>

        <Avatar
          sx={{
            bgcolor: "#1565C0",
            width: 40,
            height: 40,
          }}
        >
          H
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default TopNavbar;