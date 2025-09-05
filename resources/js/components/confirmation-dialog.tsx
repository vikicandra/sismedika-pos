import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  message: string;
  error?: string | null;
  onAgree: () => void;
  onDisagree: () => void;
}

export default function ConfirmationDialog({
  open,
  title,
  message,
  error,
  onAgree,
  onDisagree,
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onDisagree}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDisagree}>No</Button>
        <Button onClick={onAgree} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
