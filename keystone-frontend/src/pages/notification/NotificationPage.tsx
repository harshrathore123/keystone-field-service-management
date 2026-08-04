import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

import DashboardLayout from "../../components/layout/DashboardLayout";
import SearchBar from "../../components/common/SearchBar";
import AppSnackbar from "../../components/common/AppSnackbar";

import NotificationService from "../../services/NotificationService";
import type { Notification } from "../../types/Notification";

function NotificationPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const loadNotifications = async () => {
    try {
      setLoading(true);

      const data = await NotificationService.getNotifications();

      setNotifications(data);
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to load notifications.");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      await loadNotifications();
    };

    void fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await NotificationService.markAsRead(id);

      setSnackbarSeverity("success");
      setSnackbarMessage("Notification marked as read.");
      setSnackbarOpen(true);

      await loadNotifications();
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Operation failed.");
      setSnackbarOpen(true);
    }
  };

  const filteredNotifications = useMemo(() => {
    const keyword = search.toLowerCase();

    return notifications.filter(
      (notification) =>
        notification.title.toLowerCase().includes(keyword) ||
        notification.message.toLowerCase().includes(keyword),
    );
  }, [notifications, search]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  return (
    <DashboardLayout>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Notifications
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Stay updated with work order activities and system alerts
            </Typography>
          </Box>

          <Chip
            color={unreadCount > 0 ? "error" : "success"}
            label={unreadCount > 0 ? `${unreadCount} Unread` : "All Read"}
          />
        </Box>

        <Box mb={3}>
          <SearchBar
            value={search}
            placeholder="Search by title or message..."
            onChange={setSearch}
          />
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : filteredNotifications.length === 0 ? (
          <Box py={8} textAlign="center">
            <Typography variant="h6">No Notifications Found</Typography>

            <Typography color="text.secondary">
              You're all caught up.
            </Typography>
          </Box>
        ) : (
          <Card
            elevation={6}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <CardContent>
              <List sx={{ p: 0 }}>
                {filteredNotifications.map((notification) => (
                  <Box key={notification.id}>
                    <ListItem
                      sx={{
                        py: 2,
                        px: 3,
                        borderRadius: 2,
                        borderLeft: notification.isRead
                          ? "4px solid transparent"
                          : "4px solid #1976d2",
                        bgcolor: notification.isRead
                          ? "background.paper"
                          : "rgba(25,118,210,0.08)",

                        "&:hover": {
                          bgcolor: "#F5F9FF",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography component="span" fontWeight="bold">
                            {notification.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {notification.message}
                            </Typography>

                            <Typography
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              {new Date(notification.createdAt).toLocaleString(
                                "en-IN",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                },
                              )}
                            </Typography>
                          </>
                        }
                      />

                      {notification.isRead ? (
                        <Chip
                          label="Read"
                          color="success"
                          size="small"
                          sx={{
                            fontWeight: 700,
                            minWidth: 70,
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                    </ListItem>

                    <Divider />
                  </Box>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        <AppSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
        />
      </Box>
    </DashboardLayout>
  );
}

export default NotificationPage;
