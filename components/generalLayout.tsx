"use client";
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CiBank } from "react-icons/ci";

import Link from "next/link";
import { MdBalance } from "react-icons/md";
import { usePathname } from "next/navigation";

type GeneralLayoutProps = {
  title: string;
  bred?: any;
  shortcut?: any;
  children: React.ReactNode;
};

const GeneralLayout = ({ title, bred, children }: GeneralLayoutProps) => {
  const pathname = usePathname().split("/")[1];

  return (
    <Card className=" p-0 border-none max-md:my-4 pb-10 w-full m-0">
      <CardHeader className=" p-2">
        <CardTitle className="text-2xl px-1 md:flex md:justify-between">
          <span>{title}</span>
          <div className="max-md:hidden">
            <Shortcut shortcut={pathname} />
          </div>
        </CardTitle>
        {bred}
      </CardHeader>

      <CardContent className="grid p-0 ">{children}</CardContent>
    </Card>
  );
};

export default GeneralLayout;

const shorts = [
  {
    id: 1,
    path: "valorisation",
    name: "Valuation",
    logo: <MdBalance size={30} className="font-thin text-sky-500" />,
    links: [
      { id: 1, title: "Straight/Amortized Bond", link: "/valorisation/simple" },
      {
        id: 2,
        title: "Floating/Amortized Rate Bond",
        link: "/valorisation/frb",
      },
      { id: 3, title: "Step Up Coupon", link: "/valorisation/stepup" },
      { id: 4, title: "Dual Currency Bond", link: "/valorisation/dual" },
      {
        id: 5,
        title: "Commo/Amortized Back Bond",
        link: "/valorisation/commo",
      },
      {
        id: 6,
        title: "European/American Option",
        link: "/valorisation/options",
      },
    ],
  },
  {
    id: 2,
    path: "banque",
    name: "Central Bank",
    logo: <CiBank size={30} className="font-thin text-sky-500" />,
    links: [
      {
        id: 1,
        title: "Key Interest Rate",
        link: "/banque/tdir",
      },
      {
        id: 2,
        title: "Expected Inflation",
        link: "/banque/infa",
      },

      { id: 3, title: "Interest Rate Swap", link: "/banque/irs" },
      { id: 4, title: "Cross Currency Swap", link: "/banque/ccs" },
      { id: 5, title: "Commodity Swap", link: "/banque/comos" },
    ],
  },
];

type ShortcutProps = {
  shortcut: string;
};
export function Shortcut({ shortcut }: ShortcutProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="flex text-sm items-end gap-2 dark:bg-teal-400/10 p-2 px-4 rounded-full hover:cursor-pointer">
          {/* <MdBalance size={30} className="font-thin text-sky-500" /> */}
          {shorts.find((el) => el.path == shortcut)?.logo}
          {shorts.find((el) => el.path == shortcut)?.name}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sky-600 font-semibold">
              {shorts.find((el) => el.path == shortcut)?.name}
            </h4>
            <div className="flex flex-col max-md:hidden">
              {shorts
                .find((el) => el.path == shortcut)
                ?.links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.link}
                    className="hover:text-yellow-400 text-sm font-medium mb-2"
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
