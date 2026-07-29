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

function TopNavbar() {
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
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <Badge
            badgeContent={3}
            color="error"
          >
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