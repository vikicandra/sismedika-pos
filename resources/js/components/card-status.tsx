import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SquareIcon from "@mui/icons-material/Square";
import { AllStatus } from "@/enums/allStatus";

interface ConfirmationDialogProps {
  title: string;
  statuses: AllStatus[];
}

const statusColors: Record<
  AllStatus,
  "success" | "warning" | "error" | "info"
> = {
  open: "success",
  closed: "warning",
  cancelled: "error",
  available: "success",
  occupied: "info",
  reserved: "warning",
  inactive: "error",
};

export default function CardStatus({
  statuses,
  title,
}: ConfirmationDialogProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={3}>
        {statuses.map((status) => (
          <Box key={status} sx={{ mb: 2 }}>
            <SquareIcon
              color={statusColors[status]}
              sx={{ verticalAlign: "middle", mr: 1 }}
            />
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
