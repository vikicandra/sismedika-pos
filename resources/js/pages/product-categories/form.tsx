import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface ProductCategoryFormProps {
  title: string;
  data: { name: string };
  setData: (key: string, value: string) => void;
  processing: boolean; // Assuming this is a boolean from useForm
  errors: { name?: string }; // More specific type for errors
  submit: FormEventHandler;
}

export default function ProductCategoryForm({
  title,
  data,
  setData,
  processing,
  errors,
  submit,
}: ProductCategoryFormProps) {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={submit}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="name"
              name="name"
              label="Category Name"
              variant="outlined"
              fullWidth
              size="small"
              value={data?.name}
              onChange={(e) => setData("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ mb: 2, mt: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ textAlign: "right" }}>
          <Grid size={{ xs: 12, md: 6 }}>
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
