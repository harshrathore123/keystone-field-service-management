import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layout/AuthLayout";
import { login } from "../../services/AuthService";
import { saveToken } from "../../utils/token";

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please enter email and password.");
      setSnackbarOpen(true);
      return;
    }

    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      saveToken(response.token);

      setSnackbarSeverity("success");
      setSnackbarMessage(response.message);
      setSnackbarOpen(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }catch (error) {

    console.log(error);

    if (axios.isAxiosError(error)) {
        console.log(error.response);
        console.log(error.response?.data);
    }

}
  };

  return (
    <AuthLayout>
      <Card
        elevation={10}
        sx={{
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <CardContent
          sx={{
            p: 5,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome Back 👋
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Sign in to continue to KEYSTONE
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />

              <Link href="#" underline="hover">
                Forgot Password?
              </Link>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={
                loading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Login />
                )
              }
              disabled={loading}
              onClick={handleLogin}
              sx={{
                height: 55,
                borderRadius: 3,
                fontWeight: "bold",
                fontSize: 16,
                background: "linear-gradient(90deg,#1565C0,#26A69A)",

                "&:hover": {
                  background: "linear-gradient(90deg,#0D47A1,#00897B)",
                },
              }}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbarSeverity}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
}

export default LoginPage;
