import RegisterForm from "@/components/auth/registerForm";
import PageLayout from "@/components/nav/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getUser } from "@/lib/_userActions";

import React from "react";

type UpdatePerPageProps = {
  params: {
    userId: number;
  };
};

const UpdatePerPage = async ({ params }: UpdatePerPageProps) => {
  const res = await getUser(params.userId);
  const usr = await res?.data;

  //console.log("ctrs", ctrs);

  /*   const res1 = await getAllCels();
  const cels = await res1?.data; */

  // console.log("USR:", usr);

  //const res1 = await getAllZones();
  //const allZones = await res1?.data;

  //console.log("params.zoneId", params.zoneId);
  //console.log("personId", params.personId);
  //console.log("PER", per);

  return (
    <RegisterForm usr={usr} />
    /*     <PageLayout
      title="Editer un utilisateur"
      description="Cette page permet d'éditer un utilisateur"
    >
      <CustomBreadcrumb name="Editer un utilisateur" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <RegisterForm usr={usr} />
      </div>
    </PageLayout> */
  );
};

export default UpdatePerPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/users">Utilisateurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
