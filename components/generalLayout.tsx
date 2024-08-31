"use client";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

import Link from "next/link";

type GeneralLayoutProps = {
  title: string;
  bred?: any;
  shortcut?: any;
  children: React.ReactNode;
};

const GeneralLayout = ({ title, bred, children }: GeneralLayoutProps) => {
  return (
    <Card className=" p-0 border-none max-md:my-4 pb-10 w-full m-0">
      <CardHeader className=" p-2">
        <CardTitle className="text-2xl px-1 md:flex md:justify-between">
          <span>{title}</span>
          <Shortcut shortcut="Valorisation" />
        </CardTitle>
        {bred}
      </CardHeader>

      <CardContent className="grid p-0 ">{children}</CardContent>
    </Card>
  );
};

export default GeneralLayout;

const links = [
  { id: 1, title: "Straight/Amortized Bond", link: "/valorisation/simple" },
  { id: 2, title: "Floating/Amortized Rate Bond", link: "/valorisation/frb" },
  { id: 3, title: "Step Up Coupon", link: "/valorisation/stepup" },
  { id: 4, title: "Dual Currency Bond", link: "/valorisation/dual" },
  { id: 5, title: "Commo/Amortized Back Bond", link: "/valorisation/commo" },
  { id: 6, title: "European/American Option", link: "/valorisation/options" },
];

type ShortcutProps = {
  shortcut: string;
};
export function Shortcut({ shortcut }: ShortcutProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span>
          <FaBalanceScaleLeft size={30} className="text-sky-500" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sky-600 font-semibold">{shortcut}</h4>
            <div className="flex flex-col max-md:hidden">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  className="hover:text-yellow-400 text-sm font-medium"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
