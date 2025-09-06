import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import TableForm from "./form";
import { TableStatus } from "@/enums/table";
import tableRoutes from "@/routes/tables";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Create",
    href: "",
  },
];

export default function CreateProductCategory({
  statuses,
}: {
  statuses: TableStatus[];
}) {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    status: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(tableRoutes.store.url());
  };

  return (
    <>
      <Head title="Create Table" />
      <TableForm
        title="Create Table"
        statuses={statuses}
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
