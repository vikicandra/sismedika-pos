import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductCategoryCart } from "@/types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";

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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
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
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on the search query
  const filteredProducts = (products: ProductCategoryCart["products"]) =>
    products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Order Summary</Typography>
            <Typography variant="body2">
              {"Table " + table_id + " • " + now}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

Cart.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
