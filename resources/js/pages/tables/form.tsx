import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormEventHandler } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { TableStatus } from "@/enums/table";

interface TableFormProps {
  title: string;
  data: { name: string; status: string };
  statuses: TableStatus[];
  setData: (key: string, value: string) => void;
  processing: boolean;
  errors: { name?: string; status?: string };
  submit: FormEventHandler;
}

export default function TableForm({
  title,
  data,
  statuses,
  setData,
  processing,
  errors,
  submit,
}: TableFormProps) {
  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <form onSubmit={submit}>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <TextField
              id="name"
              name="name"
              label="Name"
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

        <Grid container>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small" error={!!errors.status}>
              <InputLabel
                id={
                  errors.status
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
              >
                Category
              </InputLabel>
              <Select
                labelId={
                  errors.status
                    ? "demo-simple-select-error-label"
                    : "demo-simple-select-label"
                }
                id={
                  errors.status
                    ? "demo-simple-select-error"
                    : "demo-simple-select"
                }
                error={!!errors.status}
                value={data.status}
                label="Category"
                onChange={(e) => setData("status", e.target.value)}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.status && (
                <FormHelperText>{errors.status}</FormHelperText>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Grid container sx={{ textAlign: "right", mt: 2 }}>
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
