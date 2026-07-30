import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDeleteDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmDeleteDialog({
  open,
  title = "Delete",
  message = "Are you sure you want to delete this record? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;