import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
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
import ConfirmationDialog from "@/components/confirmation-dialog";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Product",
    // href: route("products.index"),
    href: "/products",
  },
];

interface ProductType {
  id: number;
  name: string;
  descripton: string;
  price: number;
  category_name: string;
}

export default function Product({ products }: { products: ProductType[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAgree = () => {
    if (selectedId) {
      router.delete("/products/" + selectedId, {
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
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", width: 100, align: "right" },
    { field: "category_name", headerName: "Category", width: 150 },
    { field: "created_at", headerName: "Created At", width: 200 },
    { field: "updated_at", headerName: "Updated At", width: 200 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams<ProductType>) => (
        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            color="success"
            size="small"
            startIcon={<EditIcon />}
            href={"products/" + params.row.id + "/edit"}
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

  const paginationModel = { page: 0, pageSize: 10 };
  return (
    <>
      <Head title="Product" />

      <ConfirmationDialog
        open={dialogOpen}
        title="Delete Confirmation"
        message="Are you sure you want to delete this product?"
        error={error}
        onAgree={handleDeleteAgree}
        onDisagree={handleDeleteDisagree}
      />
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Button
          component={Link}
          href={"/products/create"}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
          sx={{ mb: 1 }}
        >
          Create
        </Button>
        <Paper sx={{ width: "100%" }}>
          <DataGrid
            rows={products}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[10, 20]}
            disableRowSelectionOnClick
            sx={{ border: 0 }}
          />
        </Paper>
      </Box>
    </>
  );
}

Product.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
