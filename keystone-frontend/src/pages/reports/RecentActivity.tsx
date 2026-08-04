import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";
import { Divider } from "@mui/material";

const RecentActivity = () => {
  const activities = [
    {
      icon: <CheckCircleIcon color="success" />,
      title: "Work Order Completed",
      sub: "Technician completed assigned task",
    },
    {
      icon: <PendingActionsIcon color="warning" />,
      title: "New Work Order Created",
      sub: "Waiting for technician assignment",
    },
    {
      icon: <EngineeringIcon color="primary" />,
      title: "Technician Assigned",
      sub: "Task assigned successfully",
    },
  ];

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        borderRadius: 4,
        mt: 3,
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={3}>
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <Box key={index}>
            <ListItem
              key={index}
              sx={{
                borderRadius: 2,
                transition: "0.2s",
                mb: 1,

                "&:hover": {
                  bgcolor: "#F5F9FF",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: "#E3F2FD",
                    color: "#1976d2",
                    width: 48,
                    height: 48,
                  }}
                >
                  {item.icon}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={<Typography fontWeight={600}>{item.title}</Typography>}
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {item.sub}
                  </Typography>
                }
              />
            </ListItem>
            {index !== activities.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity;
