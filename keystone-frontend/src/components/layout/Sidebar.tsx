import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

import { useLocation, useNavigate } from "react-router-dom";

import { removeToken } from "../../utils/token";

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    title: "Customers",
    icon: <GroupsIcon />,
    path: "/customers",
  },
  {
    title: "Sites",
    icon: <BusinessIcon />,
    path: "/sites",
  },
  {
    title: "Work Orders",
    icon: <AssignmentIcon />,
    path: "/workorders",
  },
  {
    title: "Technicians",
    icon: <EngineeringIcon />,
    path: "/technicians",
  },
  {
    title: "Inventory",
    icon: <Inventory2Icon />,
    path: "/inventory",
  },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
      }}
    >
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
          KEYSTONE
        </Typography>
      </Toolbar>

      <Divider sx={{ bgcolor: "#334155" }} />

      <List>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.title}
            selected={location.pathname === menu.path}
            onClick={() => navigate(menu.path)}
            sx={{
              color: "#fff",
              mx: 1,
              my: 0.5,
              borderRadius: 2,

              bgcolor:
                location.pathname === menu.path
                  ? "#2563EB"
                  : "transparent",

              "&.Mui-selected": {
                bgcolor: "#2563EB",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#1D4ED8",
              },

              "&:hover": {
                bgcolor: "#1E40AF",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              {menu.icon}
            </ListItemIcon>

            <ListItemText primary={menu.title} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ bgcolor: "#334155", mt: 2 }} />

      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: "#fff",
            mx: 1,
            borderRadius: 2,

            "&:hover": {
              bgcolor: "#DC2626",
            },
          }}
        >
          <ListItemIcon sx={{ color: "#fff" }}>
            <LogoutIcon />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
}

export default Sidebar;