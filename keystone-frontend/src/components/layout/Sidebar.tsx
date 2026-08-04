import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BuildIcon from "@mui/icons-material/Build";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useLocation, useNavigate } from "react-router-dom";

import { removeToken, getUserRole } from "../../utils/token";

interface SidebarProps {
  collapsed: boolean;
}

function Sidebar({ collapsed }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const role = getUserRole();

  const managerMenus = [
    { title: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { title: "Customers", icon: <GroupsIcon />, path: "/customers" },
    { title: "Sites", icon: <BusinessIcon />, path: "/sites" },
    { title: "Work Orders", icon: <AssignmentIcon />, path: "/workorders" },
    { title: "Technicians", icon: <EngineeringIcon />, path: "/technicians" },
    { title: "Inventory", icon: <Inventory2Icon />, path: "/inventory" },
    { title: "Part Usage", icon: <BuildIcon />, path: "/part-usage" },
    { title: "Time Logs", icon: <AccessTimeIcon />, path: "/time-logs" },
    { title: "Reports", icon: <AssessmentIcon />, path: "/reports" },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
  ];

  const dispatcherMenus = [
    { title: "Customers", icon: <GroupsIcon />, path: "/customers" },
    { title: "Sites", icon: <BusinessIcon />, path: "/sites" },
    { title: "Work Orders", icon: <AssignmentIcon />, path: "/workorders" },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
  ];

  const technicianMenus = [
    {
      title: "Dashboard",
      icon: <DashboardIcon />,
      path: "/technician-dashboard",
    },
    { title: "My Jobs", icon: <WorkHistoryIcon />, path: "/my-jobs" },
    { title: "Part Usage", icon: <BuildIcon />, path: "/part-usage" },
    { title: "Time Logs", icon: <AccessTimeIcon />, path: "/time-logs" },
    {
      title: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
  ];

  const customerMenus = [
    {
      title: "Customer Portal",
      icon: <AssignmentIcon />,
      path: "/customer",
    },
  ];

  const menus =
    role === "MANAGER"
      ? managerMenus
      : role === "DISPATCHER"
        ? dispatcherMenus
        : role === "TECHNICIAN"
          ? technicianMenus
          : customerMenus;

  const handleLogout = () => {
    removeToken();
    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 260,
        transition: "all .3s ease",
        minHeight: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {collapsed ? "K" : "KEYSTONE"}
        </Typography>
      </Toolbar>

      <Divider sx={{ bgcolor: "#334155" }} />

      <List>
        {menus.map((menu) => (
          <Tooltip
            key={menu.title}
            title={collapsed ? menu.title : ""}
            placement="right"
          >
            <ListItemButton
              selected={location.pathname === menu.path}
              onClick={() => navigate(menu.path)}
              sx={{
                color: "#fff",
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                justifyContent: collapsed ? "center" : "flex-start",
                bgcolor:
                  location.pathname === menu.path ? "#2563EB" : "transparent",

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
              <ListItemIcon
                sx={{
                  color: "#fff",
                  minWidth: collapsed ? 0 : 40,
                  justifyContent: "center",
                }}
              >
                {menu.icon}
              </ListItemIcon>

              {!collapsed && <ListItemText primary={menu.title} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>

      <Divider sx={{ bgcolor: "#334155", mt: 2 }} />

      <List>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "#fff",
              mx: 1,
              borderRadius: 2,
              justifyContent: collapsed ? "center" : "flex-start",

              "&:hover": {
                bgcolor: "#DC2626",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: collapsed ? 0 : 40,
                justifyContent: "center",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>

            {!collapsed && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );
}

export default Sidebar;
