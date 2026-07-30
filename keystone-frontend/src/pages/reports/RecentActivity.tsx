import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import EngineeringIcon from "@mui/icons-material/Engineering";

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
    <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
      <Typography variant="h6" mb={2}>
        Recent Activity
      </Typography>

      <List>
        {activities.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{item.icon}</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={item.title}
              secondary={item.sub}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivity;