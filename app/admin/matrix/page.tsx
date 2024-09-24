import GeneralLayout from "@/components/generalLayout";
import DefMatrix from "@/components/matrix/defMatrix";
import ImpMatrix from "@/components/matrix/impMatrix";
import TransMatrix from "@/components/matrix/transMatrix";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const MatrixPage = () => {
  return (
    <GeneralLayout
      title="Matrices"
      bred={<CustomBreadcrumb name="All matrices" />}
    >
      <div className="max-md:px-1 md:grid grid-cols-2 gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full  p-4 rounded-xl">
          <TransMatrix />
        </div>
        <div className="bg-gray-500/10 dark:bg-teal-200/10   max-md:w-full  p-4 rounded-xl">
          <DefMatrix />
        </div>
        <div className="bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full  p-4 rounded-xl">
          <ImpMatrix />
        </div>
      </div>
    </GeneralLayout>
  );
};

export default MatrixPage;

const CustomBreadcrumb = ({ name, code }: { name: string; code?: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home Page</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
              <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">
            {name}: <strong className="text-lg text-sky-700">{code}</strong>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
