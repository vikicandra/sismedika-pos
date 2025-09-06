import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ProductCategoryType } from "@/types";
import { NumericFormat } from "react-number-format";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

interface ProductFormProps {
  title: string;
  productCategories: ProductCategoryType[];
  data: {
    name: string;
    price: number;
    description: string;
    product_category_id: string;
  };
  setData: (key: string, value: string) => void;
  processing: boolean;
  errors: {
    name?: string;
    price?: string;
    description?: string;
    product_category_id?: string;
  };
  submit: FormEventHandler;
}

export default function ProductForm({
  title,
  productCategories,
  data,
  setData,
  processing,
  errors,
  submit,
}: ProductFormProps) {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="name"
              name="name"
              label="Product Name"
              variant="outlined"
              fullWidth
              size="small"
              value={data?.name}
              onChange={(e) => setData("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <NumericFormat
              customInput={TextField}
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              fullWidth
              size="small"
              value={data?.price}
              error={!!errors.price}
              helperText={errors.price}
              thousandSeparator="."
              decimalSeparator=","
              onValueChange={(values) => {
                setData("price", values.value);
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl
              fullWidth
              size="small"
              error={!!errors.product_category_id}
            >
              <InputLabel
                id={
                  errors.product_category_id
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
              >
                Category
              </InputLabel>
              <Select
                labelId={
                  errors.product_category_id
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
                id={
                  errors.product_category_id
                    ? "demo-simple-select-error"
                    : "demo-simple-select"
                }
                error={!!errors.product_category_id}
                value={data.product_category_id}
                label="Category"
                onChange={(e) => setData("product_category_id", e.target.value)}
                // helperText={errors.product_category_id} // Select doesn't have helperText, error is shown on label
              >
                {productCategories.map((category: ProductCategoryType) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.product_category_id && (
                <FormHelperText>{errors.product_category_id}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              size="small"
              value={data?.description}
              onChange={(e) => setData("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ textAlign: "right", mt: 2 }}>
          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={processing}
              sx={{ textAlign: "right" }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
