import CardStatus from "@/components/card-status";
import { TableStatus } from "@/enums/tableStatus";
import { Table, type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const statusColors: Record<TableStatus, string> = {
  available: "success.main",
  occupied: "info.main",
  reserved: "warning.main",
  inactive: "error.main",
};

export default function Welcome({
  statuses,
  tables,
}: {
  tables: Table[];
  statuses: TableStatus[];
}) {
  const { auth } = usePage<SharedData>().props;

  return (
    <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
      <Head title="Welcome" />
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4 }}>
        Welcome To My Restaurant
      </Typography>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid size={8} offset={2}>
          <CardStatus title="Table Status" statuses={statuses} />
        </Grid>
      </Grid>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid size={8} offset={2}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {tables.map((table) => (
                <Grid size={{ md: 2 }} key={table.id}>
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
      </Grid>
    </Box>
  );
}
