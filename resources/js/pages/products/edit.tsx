import AppLayout from "@/layouts/app-layout";
import { ProductCategoryType, type BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import ProductForm from "./from";
import products from "@/routes/products";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Edit",
    href: "",
  },
];

interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  product_category_id: string;
}

export default function EditProductCategory({
  productCategories,
  product,
}: {
  productCategories: ProductCategoryType[];
  product: ProductType;
}) {
  const { data, setData, put, errors, processing } = useForm({
    name: product.name,
    description: product.description,
    price: product.price,
    product_category_id: product.product_category_id,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(products.update.url({ product: product.id }));
  };

  return (
    <>
      <Head title="Create Product" />
      <ProductForm
        title="Create Product"
        productCategories={productCategories}
        data={data}
        errors={errors}
        processing={processing}
        submit={submit}
        setData={setData}
      />
    </>
  );
}

EditProductCategory.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
