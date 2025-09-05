import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import productCategoriesRoutes from "@/routes/product-categories";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import ProductCategoryForm from "./form";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create",
    href: "",
  },
];

export default function CreateProductCategory() {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(productCategoriesRoutes.store.url());
  };

  return (
    <>
      <Head title="Create Product Category" />
      <ProductCategoryForm
        title="Create Product Category"
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
