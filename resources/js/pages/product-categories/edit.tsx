import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, ProductCategoryType } from "@/types";
import productCategoriesRoutes from "@/routes/product-categories";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import ProductCategoryForm from "./form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Edit Product Categories",
    href: "",
  },
];

export default function ProductCategoryEdit({
  productCategory,
}: {
  productCategory: ProductCategoryType;
}) {
  const { data, setData, put, errors, processing } = useForm({
    name: productCategory.name,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(
      productCategoriesRoutes.update.url({
        product_category: productCategory.id,
      }),
    );
  };

  return (
    <>
      <Head title="Edit Product Category" />
      <ProductCategoryForm
        title="Edit Product Category"
        data={data}
        errors={errors}
        processing={processing}
        submit={submit}
        setData={setData}
      />
    </>
  );
}

ProductCategoryEdit.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
