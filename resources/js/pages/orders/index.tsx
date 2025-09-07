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
import EditIcon from "@mui/icons-material/Edit";
import CardStatus from "@/components/card-status";
import CardActions from "@mui/material/CardActions";

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
            New Order
          </Button>
        </Grid>
        <Grid size={{ md: 6 }}></Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {orders.map((order) => (
          <Grid size={{ md: 3 }} key={order.id}>
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
                <Typography sx={{ color: "text.secondary" }}>
                  {"Table " + order.table.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {order.customer_name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ textAlign: "right", mt: 2, mb: 0 }}
                  gutterBottom
                >
                  {"Rp. " + new Intl.NumberFormat().format(order.total_price)}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                <Button
                  size="small"
                  component={Link}
                  href={"/orders/" + order.id}
                  variant="contained"
                  color="info"
                >
                  View
                </Button>
                {order.status === "open" && (
                  <Button
                    size="small"
                    component={Link}
                    href={"/orders/" + order.id + "/edit"}
                    color="success"
                    variant="contained"
                    startIcon={<EditIcon />}
                  >
                    Edit Order
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

OrderIndex.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
