import { Snackbar, Alert } from "@mui/material";

interface AppSnackbarProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  autoHideDuration?: number;
  onClose: () => void;
}

function AppSnackbar({
  open,
  message,
  severity = "success",
  autoHideDuration = 3000,
  onClose,
}: AppSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AppSnackbar;