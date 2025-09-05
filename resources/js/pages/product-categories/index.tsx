import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import {
  ProductCategory as ProductCategoryType,
  type BreadcrumbItem,
} from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Alert from "@mui/material/Alert";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Product Category",
    href: dashboard().url,
  },
];

export default function ProductCategory({
  productCategories,
}: {
  productCategories: ProductCategoryType[];
}) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAgree = () => {
    if (selectedId) {
      router.delete("/product-categories/" + selectedId, {
        onSuccess: () => {
          setDialogOpen(false);
          setSelectedId(null);
          setError(null);
        },
        onError: (errors) => {
          console.log(errors);

          // Ambil pesan error pertama, atau tampilkan pesan default
          const firstError = Object.values(errors)[0];
          setError(firstError || "An unexpected error occurred.");
        },
      });
    }
  };

  const handleDeleteDisagree = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setError(null);
  };

  const deleteRow = (id: number) => {
    setSelectedId(id);
    setDialogOpen(true);
  };

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
            href={`/product-categories/${params.row.id}/edit`}
            component={Link}
          >
            Edit
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

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedId(null);
    setError(null);
  };

  return (
    <>
      <Head title="Product Category" />

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this item?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDisagree}>Disagree</Button>
          <Button onClick={handleDeleteAgree} autoFocus>
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
