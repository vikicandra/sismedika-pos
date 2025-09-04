import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { ProductCategory as ProductCategoryType, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Category',
        href: dashboard().url,
    },
];
const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', width: 200},
    { field: 'created_at', headerName: 'Created At', width: 300 },
    { field: 'updated_at', headerName: 'Updated At', width: 300 },
    {
        field: 'action',
        headerName: 'Actions',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams<ProductCategoryType>) => (
            <Stack direction={'row'} spacing={1}>
                    <Button variant="contained" color="success" size="small" startIcon={<EditIcon />}>
                <Link href={`/product-categories/${params.row.id}/edit`} style={{ textDecoration: 'none' }}>
                            Edit
                </Link>
                    </Button>
            <Button variant="contained" color="error" size="small" startIcon={<DeleteIcon />} onClick={() => deleteRow(params.row.id)}>
                Delete
            </Button>
            </Stack>
        ),
    },
];

const paginationModel = { page: 0, pageSize: 5 };

const deleteRow = (id: number) => {
    router.delete('/product-categories/' + id)
}

export default function ProductCategory({ productCategories }: { productCategories: ProductCategoryType[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Category" />
                <Box sx={{ flexGrow: 1, p: 2 }}>
                    <Link href={'/product-categories/create'}>
                        <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />} sx={{ mb: 1 }}>
                            Create
                        </Button>
                    </Link>
                    <Paper sx={{ width: '100%' }}>
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

        </AppLayout>
    );
}

