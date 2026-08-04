import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { changePassword } from "../../services/AuthService";
import AppSnackbar from "../../components/common/AppSnackbar";

function SettingsPage() {
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const email = localStorage.getItem("email") || "";
  const role = localStorage.getItem("role") || "";

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const handlePasswordChange = async () => {
    const newErrors = {
      oldPassword: oldPassword ? "" : "Old Password is required",

      newPassword:
        newPassword.length >= 6 ? "" : "Password must be at least 6 characters",

      confirmPassword:
        confirmPassword === newPassword ? "" : "Passwords do not match",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) {
      return;
    }

    try {
      const message = await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      setSnackbarSeverity("success");
      setSnackbarMessage(message);
      setSnackbarOpen(true);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setSnackbarSeverity("error");
      setSnackbarMessage("Failed to change password.");
      setSnackbarOpen(true);
    }
  };

  return (
    <DashboardLayout>
      <Box display="flex" justifyContent="center" py={4}>
        <Card
          sx={{
            width: 650,
            borderRadius: 4,
            boxShadow: 4,
          }}
        >
          <CardContent>
            <Typography variant="h4" fontWeight="bold" mb={3}>
              Settings
            </Typography>

            <Stack spacing={3} alignItems="center">
              <Avatar
                sx={{
                  width: 90,
                  height: 90,
                  bgcolor: "primary.main",
                  fontSize: 34,
                }}
              >
                {firstName.charAt(0)}
              </Avatar>

              <Divider flexItem />

              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Email"
                value={email}
                InputProps={{ readOnly: true }}
              />

              <TextField
                fullWidth
                label="Role"
                value={role}
                InputProps={{ readOnly: true }}
              />

              <Divider flexItem />

              <Typography variant="h6" alignSelf="flex-start">
                Change Password
              </Typography>

              <TextField
                fullWidth
                label="Old Password"
                type="password"
                value={oldPassword}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword}
                onChange={(e) => {
                  setOldPassword(e.target.value);
                  setErrors((p) => ({
                    ...p,
                    oldPassword: "",
                  }));
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                error={!!errors.newPassword}
                helperText={errors.newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    newPassword: "",
                  }));
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: "",
                  }));
                }}
              />

              <Button
                variant="contained"
                onClick={handlePasswordChange}
                sx={{
                  borderRadius: 3,
                  px: 5,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Change Password
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <AppSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setSnackbarOpen(false)}
      />
    </DashboardLayout>
  );
}

export default SettingsPage;
