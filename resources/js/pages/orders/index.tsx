import { OrderStatus } from "@/enums/orderStatus";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Order } from "@/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "@inertiajs/react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CardStatus from "@/components/card-status";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Orders",
    href: "/orders",
  },
];

const statusColors: Record<OrderStatus, "success" | "warning" | "error"> = {
  open: "success",
  closed: "warning",
  cancelled: "error",
};

export default function OrderIndex({
  orders,
  statuses,
}: {
  orders: Order[];
  statuses: OrderStatus[];
}) {
  return (
    <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
      <CardStatus title="Order Status" statuses={statuses} />
      <Grid container sx={{ mt: 3 }}>
        <Grid size={{ md: 6 }}>
          <Button
            component={Link}
            href="/orders/create"
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Order
          </Button>
        </Grid>
        <Grid size={{ md: 6 }}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {orders.map((order) => (
          <Grid size={{ md: 3 }} key={order.id}>
            <Link href={"orders/" + order.id}>
              <Card key={order.id}>
                <CardContent>
                  <Grid container>
                    <Grid size={{ md: 6 }}>
                      <Typography variant="h6" gutterBottom>
                        {"ORD" + order.id}
                      </Typography>
                    </Grid>
                    <Grid size={{ md: 6 }} sx={{ textAlign: "right" }}>
                      <Chip
                        label={order.status.toUpperCase()}
                        size="small"
                        color={statusColors[order.status]}
                        sx={{ px: 2, mb: 2 }}
                      />
                    </Grid>
                  </Grid>
                  {"Table " + order.table.name}
                  <br />
                  {order.customer_name}
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "right" }}
                    gutterBottom
                  >
                    {"Rp. " + new Intl.NumberFormat().format(order.total_price)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

OrderIndex.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
