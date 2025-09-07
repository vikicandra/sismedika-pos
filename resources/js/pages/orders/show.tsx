import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, OrderEdit } from "@/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Order Summary",
    href: "",
  },
];

export default function ShowOrder({
  now,
  order,
}: {
  now: string;
  order: OrderEdit;
}) {
  return (
    <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography variant="body2">
              {"Customer " + order.customer_name}
            </Typography>
            <Typography variant="body2">{"Table " + order.table_id}</Typography>
            <Typography variant="body2">{now}</Typography>

            <Box sx={{ mt: 2 }}>
              {order.detail.map(
                (item) =>
                  item.id !== 0 && (
                    <Grid container key={item.id} sx={{ mt: 2 }}>
                      <Grid
                        size={{ md: 8, xs: 12 }}
                        sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}
                      >
                        <Typography variant="body1">
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2">
                          {item.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          })}{" "}
                          x {item.quantity}
                        </Typography>
                      </Grid>
                      <Grid
                        size={{ md: 4, xs: 12 }}
                        sx={{ textAlign: "right" }}
                      >
                        <Typography variant="body1">
                          {item.sub_total.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          })}
                        </Typography>
                      </Grid>
                    </Grid>
                  ),
              )}
            </Box>

            <Box sx={{ mt: 2, borderTop: 1, borderColor: "divider" }}>
              <Grid container sx={{ mt: 2 }}>
                <Grid size={6}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    Total:
                  </Typography>
                </Grid>
                <Grid
                  size={6}
                  sx={{ textAlign: "right", verticalAlign: "middle" }}
                >
                  <Typography variant="h6">
                    {order.total_price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

ShowOrder.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
