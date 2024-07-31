"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type GeneralLayoutProps = {
  title: string;
  bred?: any;
  children: React.ReactNode;
};

const GeneralLayout = ({ title, bred, children }: GeneralLayoutProps) => {
  return (
    <Card className=" p-0 border-none max-md:my-4 my-auto w-full m-0">
      <CardHeader className=" p-2">
        <CardTitle className="text-2xl px-1">{title}</CardTitle>
        {bred}
      </CardHeader>

      <CardContent className="grid p-0 ">{children}</CardContent>
    </Card>
  );
};

export default GeneralLayout;
