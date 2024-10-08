import BatchesList from "@/components/debtAna/batches/batchesList";
import GeneralLayout from "@/components/generalLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const BatchesPage = () => {
  return (
    <GeneralLayout
      title="Batches"
      bred={<CustomBreadcrumb name="All batches" />}
    >
      <div className="max-md:px-1 md:grid grid-cols-2 gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full  p-4 rounded-xl">
          <BatchesList />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default BatchesPage;

const CustomBreadcrumb = ({ name, code }: { name: string; code?: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home Page</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">
            {name}: <strong className="text-lg text-sky-700">{code}</strong>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
