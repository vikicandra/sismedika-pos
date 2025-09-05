import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductCategory } from "@/types";
import productCategoriesRoutes from "@/routes/product-categories";
import { Head, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormEventHandler } from "react";
import SaveIcon from "@mui/icons-material/Save";
import Paper from "@mui/material/Paper";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Edit Product Categories",
    href: "",
  },
];

export default function ProductCategoryEdit({
  productCategory,
}: {
  productCategory: ProductCategory;
}) {
  const { data, setData, put, errors, processing } = useForm({
    name: productCategory.name,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(
      productCategoriesRoutes.update.url({
        product_category: productCategory.id,
      }),
    );
  };

  return (
    <>
      <Head title="Edit Product Category" />
      <Grid container sx={{ p: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component={Paper} sx={{ flexGrow: 1, p: 2, borderRadius: 1 }}>
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

ProductCategoryEdit.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
