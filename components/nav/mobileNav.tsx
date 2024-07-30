"use client";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { GiSuspensionBridge } from "react-icons/gi";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import Link from "next/link";
import { IoStatsChartOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
import { useRouter } from "next/router";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import SimpleLink from "./simpleLink";
import Valorisation from "./valorisation";

const ListItems = [
  {
    id: 1,
    link: "overview",
    icon: <RiDashboardLine size={20} />,
    tooltip: "Overview",
    title: "Overview",
    role: "AGENT",
  },

  {
    id: 2,
    link: "valorisation",
    icon: <IoStatsChartOutline size={20} />,
    role: "AGENT",
    tooltip: "Valorisation",
    subtitle: "Valorisation",
    subdesc:
      "Utiliser les pricers pour évaluer les obligations et les options.",
    sublinks: [
      { id: 1, title: "Straight Bond", link: "/valorisation/sb1" },
      { id: 2, title: "Amortized Simple Bond", link: "/valorisation/asb" },
      { id: 3, title: "Floating Rate Bond", link: "/valorisation/frb" },
      //      { id: 4, title: "Straight Bond", link: "/valorisation/sb1" },
      { id: 5, title: "Amortized FRN", link: "/valorisation/afr" },
      { id: 6, title: "Step up Coupon", link: "/valorisation/suc" },
      { id: 7, title: "Dual Currency Bond", link: "/valorisation/dcb" },
      { id: 8, title: "Commodity Back Bond", link: "/valorisation/cbb" },
      {
        id: 9,
        title: "Amortized Commodity Back Bond",
        link: "/valorisation/acbb",
      },
      { id: 10, title: "European Option", link: "/valorisation/eo" },
      { id: 11, title: "American Option", link: "/valorisation/ao" },
      //  { id: 12, title: "Interest Rate Swap", link: "/valorisation/irs" },
      //  { id: 13, title: "Cross Currency Swap", link: "/valorisation/ccs" },
    ],
  },
];

type MobileNavProps = {
  userSession: any;
};

const MobileNav = ({ userSession }: MobileNavProps) => {
  return (
    <div className="md:hidden flex">
      <MobileMenu userSession={userSession} />
      {/*       <>
        {" "}
        <div className="px-2 pb-2 flex justify-between items-center">
          <div className="flex flex-col ml-4">
            <div
              className={`hover:cursor-pointer flex items-start gap-2 overflow-hidden transition-all 
                `}
              // onClick={() => router.replace("/")}
            >
              <GiSuspensionBridge size={40} className="text-sky-600" />{" "}
              <div className=" flex text-teal-700 text-xl font-semibold">
                <strong className="text-4xl">E</strong>
                <div className="leading-4 flex flex-col items-start justify-center">
                  <Link href="/">
                    <span className="pt-1">merging</span>
                    <span className="text-sm">
                      <strong>M</strong>arkets
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </> */}
    </div>
  );
};

export default MobileNav;

type MobileMenuProps = {
  userSession: any;
};
const MobileMenu = ({ userSession }: MobileMenuProps) => {
  // console.log("userSession:", userSession);
  const [expended, setExpended] = useState(true);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {" "}
          <MdMenu size={30} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-sky-950 text-white border-none">
        <p>TEST</p>
        <ul className="flex-1 px-3 mt-4">
          {ListItems.map((item) => (
            <div
              key={item.id}
              className={` hover:text-sky-400 flex relative items-center my-2 font-medium rounded-md cursor-pointer ${
                expended ? " px-3" : "px-0"
              }`}
            >
              <div
                className={` flex items-center gap-2 overflow-hidden transition-all ${
                  expended ? "w-68" : "w-10"
                } ${
                  userSession?.user?.role != "ADMIN" && item.role == "ADMIN"
                    ? " hidden"
                    : ""
                }`}
              >
                {item.subtitle ? (
                  <Valorisation
                    st={item.subtitle}
                    sd={item.subdesc}
                    sl={item.sublinks}
                    ic={item.icon}
                    ex={expended}
                    tp={item.tooltip}
                    // chem={chem}
                    lk={item.link}
                    item={item}
                  />
                ) : (
                  <SimpleLink
                    title={item.title}
                    link={item.link}
                    ex={expended}
                    tp={item.tooltip}
                    // chem={chem}
                    icon={item.icon}
                    role={item.role}
                  />
                )}
              </div>
            </div>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
