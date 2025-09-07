import { TableStatus } from "@/enums/tableStatus";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Table } from "@/types";
import Paper from "@mui/material/Paper";
import SquareIcon from "@mui/icons-material/Square";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Table",
    href: "/tables/floor-plan",
  },
];

const statusColors: Record<TableStatus, string> = {
  available: "success.main",
  occupied: "info.main",
  reserved: "warning.main",
  inactive: "error.main",
};

export default function FloorPlan({
  tables,
  statuses,
  countTablesByStatus,
}: {
  tables: Table[];
  statuses: TableStatus[];
  countTablesByStatus: Record<string, number>;
}) {
  return (
    <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Table Status
        </Typography>
        <Stack direction="row" spacing={3}>
          {statuses.map((status) => (
            <Box key={status} sx={{ mb: 2 }}>
              <SquareIcon
                color={
                  status === "available"
                    ? "success"
                    : status === "occupied"
                      ? "info"
                      : status === "reserved"
                        ? "warning"
                        : "error"
                }
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </Box>
          ))}
        </Stack>
      </Paper>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid size={{ md: 8, xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {tables.map((table) => (
                <Grid size={{ md: 2 }}>
                  <Box
                    sx={{
                      mb: 2,
                      bgcolor: statusColors[table.status],
                      color: "primary.contrastText",
                      p: 4,
                      cursor: "pointer",
                      borderRadius: 1,
                      textAlign: "center",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  >
                    <Typography variant="h6">{table.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid size={{ md: 4, xs: 12 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>

            {Object.entries(countTablesByStatus).map(([key, value]) => (
              <Box
                bgcolor="#eceff1"
                sx={{ p: 2, mb: 2, borderRadius: 1, alignItems: "center" }}
                key={key}
              >
                <Typography variant="h5">{value}</Typography>
                <Chip
                  label={key.charAt(0).toUpperCase() + key.slice(1) + " Tables"}
                  size="small"
                  color={
                    key === "available"
                      ? "success"
                      : key === "occupied"
                        ? "info"
                        : key === "reserved"
                          ? "warning"
                          : "error"
                  }
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

FloorPlan.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
