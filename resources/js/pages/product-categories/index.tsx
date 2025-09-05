import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import {
  ProductCategory as ProductCategoryType,
  type BreadcrumbItem,
} from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Product Category",
    href: dashboard().url,
  },
];
const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 200 },
  { field: "created_at", headerName: "Created At", width: 300 },
  { field: "updated_at", headerName: "Updated At", width: 300 },
  {
    field: "action",
    headerName: "Actions",
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams<ProductCategoryType>) => (
      <Stack direction={"row"} spacing={1}>
        <Button
          variant="contained"
          color="success"
          size="small"
          startIcon={<EditIcon />}
        >
          <Link
            href={`/product-categories/${params.row.id}/edit`}
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteRow(params.row.id)}
        >
          Delete
        </Button>
      </Stack>
    ),
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const deleteRow = (id: number) => {
  router.delete("/product-categories/" + id);
};

export default function ProductCategory({
  productCategories,
}: {
  productCategories: ProductCategoryType[];
}) {
  const { flash } = usePage<{ flash: { message?: string } }>().props;
  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (flash.message) {
      setOpen(true);
    }
  }, [flash.message]);
  return (
    <>
      <Head title="Product Category" />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {flash.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Link href={"/product-categories/create"}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            sx={{ mb: 1 }}
          >
            Create
          </Button>
        </Link>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={productCategories}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
}

ProductCategory.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
