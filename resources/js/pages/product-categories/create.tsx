import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import productCategoriesRoutes from "@/routes/product-categories";
import { Head, useForm } from "@inertiajs/react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Product Categories",
    href: "/product-categories",
  },
  {
    title: "Create",
    href: "/product-categories/create",
  },
];

export default function CreateProductCategory() {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(productCategoriesRoutes.store.url());
  };

  return (
    <>
      <Head title="Create Product Category" />
      <Grid container sx={{ p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component={Paper} sx={{ flexGrow: 1, p: 2, borderRadius: 1 }}>
            <h2>Create Product Category</h2>
            <form onSubmit={submit}>
              <TextField
                id="name"
                name="name"
                label="Category Name"
                variant="outlined"
                fullWidth
                size="small"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ mb: 2, mt: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={processing}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

CreateProductCategory.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
