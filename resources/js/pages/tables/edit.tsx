import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, Table } from "@/types";
import tablesRoutes from "@/routes/tables";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import TableForm from "./form";
import { TableStatus } from "@/enums/tableStatus";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Edit Table",
    href: "",
  },
];

export default function TableEdit({
  table,
  statuses,
}: {
  table: Table;
  statuses: TableStatus[];
}) {
  const { data, setData, put, errors, processing } = useForm({
    name: table.name,
    status: table.status,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(
      tablesRoutes.update.url({
        table: table.id,
      }),
    );
  };

  return (
    <>
      <Head title="Edit Table" />
      <TableForm
        title="Edit Table"
        data={data}
        statuses={statuses}
        errors={errors}
        processing={processing}
        submit={submit}
        setData={setData}
      />
    </>
  );
}

TableEdit.layout = (page: React.ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);
