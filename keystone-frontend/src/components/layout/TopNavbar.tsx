import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import NotificationService from "../../services/NotificationService";
import { removeToken } from "../../utils/token";

interface TopNavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

function TopNavbar({ collapsed, setCollapsed }: TopNavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [unreadCount, setUnreadCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await NotificationService.getUnreadNotificationCount();

        setUnreadCount(count);
      } catch (error) {
        console.error(error);
      }
    };

    void fetchUnreadCount();
  }, []);

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

      case "/inventory":
        return "Inventory";

      case "/part-usage":
        return "Part Usage";

      case "/time-logs":
        return "Time Logs";

      case "/reports":
        return "Reports";

      case "/notifications":
        return "Notifications";

      case "/technician-dashboard":
        return "Technician Dashboard";

      case "/my-jobs":
        return "My Jobs";

      default:
        return "KEYSTONE";
    }
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#000",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <Toolbar>
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" sx={{ ml: 2 }}>
            {getTitle()}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton onClick={() => navigate("/notifications")}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton sx={{ mx: 1 }} onClick={() => navigate("/settings")}>
            <SettingsIcon />
          </IconButton>
          <Avatar
            sx={{
              bgcolor: "#1565C0",
              width: 40,
              height: 40,
              cursor: "pointer",
            }}
            onClick={handleAvatarClick}
          >
            H
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Divider />

            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleClose();
              }}
            >
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/settings");
                handleClose();
              }}
            >
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={() => {
                handleClose();
                removeToken();
                navigate("/", { replace: true });
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavbar;
