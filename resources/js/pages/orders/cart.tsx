import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductCategoryCart } from "@/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEventHandler, SyntheticEvent, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import { useForm } from "@inertiajs/react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ordersRoutes from "@/routes/orders";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "New Order",
    href: "",
  },
];
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface Item {
  id: number;
  name: string;
  price: number;
  //   quantity: number;
  //   sub_total: number;
}

export default function Cart({
  table_id,
  categories,
  now,
}: {
  table_id: number;
  categories: ProductCategoryCart[];
  now: string;
}) {
  const { data, setData, post, errors, processing } = useForm({
    table_id,
    total_price: 0,
    customer_name: "",
    items: [
      {
        id: 0,
        name: "",
        quantity: 0,
        price: 0,
        sub_total: 0,
      },
    ],
  });

  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const addToOrder = (item: Item) => {
    const existingItem = data.items.find(
      (orderItem) => orderItem.id === item.id,
    );
    if (existingItem) {
      setData(
        "items",
        data.items.map((orderItem) =>
          orderItem.id === item.id
            ? {
                ...orderItem,
                quantity: orderItem.quantity + 1,
                sub_total: orderItem.price * (orderItem.quantity + 1),
              }
            : orderItem,
        ),
      );
    } else {
      setData("items", [
        ...data.items,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          sub_total: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setData(
      "items",
      data.items
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change;
            return newQuantity > 0
              ? {
                  ...item,
                  quantity: newQuantity,
                  sub_total: item.price * newQuantity,
                }
              : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setData(
      "items",
      data.items.filter((item) => item.id !== id),
    );
  };

  //   buat fungsi ketika komponen telah diload hapus data.items yang id == 0
  useEffect(() => {
    setData(
      "items",
      data.items.filter((item) => item.id !== 0),
    );
  }, []);

  useEffect(() => {
    updateTotalPrice();
  }, [data.items]);

  const updateTotalPrice = () => {
    setData(
      "total_price",
      data.items.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0,
      ),
    );
  };
  //   const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  // Filter products based on the search query
  const filteredProducts = (products: ProductCategoryCart["products"]) =>
    products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(ordersRoutes.store.url());
  };
  return (
    <Box sx={{ flexGrow: 1, px: 2, mt: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">
          Table {table_id} <Chip label={breadcrumbs[0].title} size="small" />
        </Typography>
      </Paper>

      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid size={{ md: 6 }}>
          <Paper sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {categories.map((category, index) => (
                  <Tab
                    label={category.name}
                    key={category.id}
                    {...a11yProps(index)}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Box>
          </Paper>

          {categories.map((category, index) => (
            <TabPanel value={value} index={index} key={category.id}>
              {filteredProducts(category.products).map((product) => (
                <Paper sx={{ mt: 2, p: 2 }} key={product.id}>
                  <Grid container>
                    <Grid size={6}>
                      <Typography variant="body1">{product.name}</Typography>
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "bold" }}
                      >
                        {product.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        })}
                      </Typography>
                    </Grid>
                    <Grid
                      size={6}
                      sx={{ textAlign: "right", verticalAlign: "middle" }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: "primary.main",
                          ":hover": { bgcolor: "primary.dark" },
                        }}
                        onClick={() => addToOrder(product)}
                      >
                        <AddIcon
                          sx={{
                            color: "primary.contrastText",
                            ":hover": { color: "primary.contrastText" },
                          }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </TabPanel>
          ))}
        </Grid>
        <Grid size={{ md: 6 }}>
          <form onSubmit={submit}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Order Summary</Typography>
              <Typography variant="body2">
                {"Table " + table_id + " • " + now}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {data.items.map(
                  (item) =>
                    item.id !== 0 && (
                      <Grid container key={item.id} sx={{ mt: 2 }}>
                        <Grid size={{ md: 8, xs: 12 }}>
                          <Typography variant="body1">{item.name}</Typography>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mt: 1,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, -1)}
                              sx={{ border: "1px solid #e0e0e0" }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{ minWidth: 20, textAlign: "center" }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(item.id, 1)}
                              sx={{ border: "1px solid #e0e0e0" }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => removeItem(item.id)}
                              sx={{ color: "text.secondary" }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
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
                      {data.total_price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      })}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <TextField
                fullWidth
                size="small"
                label="Customer Name"
                variant="outlined"
                value={data.customer_name}
                onChange={(e) => setData("customer_name", e.target.value)}
                error={!!errors.customer_name}
                helperText={errors.customer_name}
                sx={{ mt: 2 }}
              />

              <Box sx={{ mt: 2 }}>
                <Button
                  startIcon={<SendIcon />}
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  disabled={processing}
                >
                  Send to Kitchen
                </Button>
                {errors.total_price && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    {errors.total_price}
                  </Typography>
                )}
              </Box>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

Cart.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
