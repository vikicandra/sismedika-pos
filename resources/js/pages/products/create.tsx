import AppLayout from "@/layouts/app-layout";
import { ProductCategoryType, type BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import ProductForm from "./from";
import products from "@/routes/products";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create",
    href: "",
  },
];

export default function CreateProductCategory({
  productCategories,
}: {
  productCategories: ProductCategoryType[];
}) {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    description: "",
    price: 0,
    product_category_id: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(products.store.url());
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

CreateProductCategory.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
