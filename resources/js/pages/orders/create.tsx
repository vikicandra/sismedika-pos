import { TableStatus } from "@/enums/tableStatus";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Table } from "@/types";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import CardStatus from "@/components/card-status";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orders",
    href: "/orders",
  },
];

const statusColors: Record<TableStatus, string> = {
  available: "success.main",
  occupied: "info.main",
  reserved: "warning.main",
  inactive: "error.main",
};

export default function OrderCreate({
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
      <CardStatus title="Table Status" statuses={statuses} />

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
                      borderRadius: 5,
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

OrderCreate.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
