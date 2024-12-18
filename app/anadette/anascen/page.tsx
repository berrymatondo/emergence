import ScenRef from "@/components/debtAna/croissance/scenRef";
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
import {
  getAllCroissances,
  getCroissancesByYear,
  getYears,
} from "@/lib/_croissanceActions";
import React from "react";

const AnascenPage = async () => {
  // Get all years
  const years = await getYears();

  let tab1: any = [];
  let tab2: any = [];
  let tab3: any = [];
  let tab4: any = [];
  let tab5: any = [];
  let tab6: any = [];
  if (years?.data) {
    //Get all croissances by year
    for (let i = 0; i < years?.data.length; i++) {
      // get scenario de reference
      const tempo = await getCroissancesByYear(years?.data[i].year, 1);
      tab1.push({ year: years?.data[i].year, data: tempo?.data[0] });

      // get croissance accelleree
      const temp = await getCroissancesByYear(years?.data[i].year, 2);
      tab2.push({ year: years?.data[i].year, data: temp?.data[0] });

      // get recession legere
      const temp3 = await getCroissancesByYear(years?.data[i].year, 3);
      tab3.push({ year: years?.data[i].year, data: temp3?.data[0] });

      // get recession severe
      const temp4 = await getCroissancesByYear(years?.data[i].year, 4);
      tab4.push({ year: years?.data[i].year, data: temp4?.data[0] });

      // get recession legere
      const temp5 = await getCroissancesByYear(years?.data[i].year, 5);
      tab5.push({ year: years?.data[i].year, data: temp5?.data[0] });

      // get recession severe
      const temp6 = await getCroissancesByYear(years?.data[i].year, 6);
      tab6.push({ year: years?.data[i].year, data: temp6?.data[0] });
    }
  }

  return (
    <GeneralLayout
      title="Analyse des scénarios"
      bred={<CustomBreadcrumb name="Tous les scénarios" />}
    >
      <div className="max-md:px-1 gap-4 w-full ">
        <div className="bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full   rounded-xl">
          <ScenRef
            scenRef={tab1}
            croisAcc={tab2}
            recLeg={tab3}
            recSev={tab4}
            chocLeg={tab5}
            chocSev={tab6}
          />
        </div>
        {/*         <div className="bg-gray-500/10 dark:bg-teal-200/10   max-md:w-full  p-4 rounded-xl">
          <DefMatrix />
        </div>
        <div className="bg-gray-500/10 dark:bg-teal-200/10  max-md:w-full  p-4 rounded-xl">
          <ImpMatrix />
        </div> */}
      </div>
    </GeneralLayout>
  );
};

export default AnascenPage;

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
