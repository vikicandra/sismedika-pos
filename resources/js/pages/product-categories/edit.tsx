import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductCategory } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { FormEventHandler } from "react";
import SaveIcon from '@mui/icons-material/Save';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Category',
        href: '/product-categories',
    },
];

export default function ProductCategoryEdit({ productCategory }: { productCategory: ProductCategory }) {
    const { data, setData, put, errors, processing } = useForm({
            name: productCategory.name,
        });

        const submit: FormEventHandler = (e) => {
            e.preventDefault();
            put('/product-categories/' + productCategory.id);
        };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product Category" />
            <Grid container sx={{ p: 2 }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ flexGrow: 1, p: 2, borderRadius: 1 }}>
                            <h2>Create Product Category</h2>
                            <form onSubmit={submit}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Category Name"
                                    variant="outlined"
                                    fullWidth
                                    size='small'
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    sx={{ mb: 2, mt: 2 }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={processing}
                                    startIcon={<SaveIcon />}>
                                    Save
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
        </AppLayout>
    );
}
