"use client";
import React, { useState } from "react";
import { GiSuspensionBridge } from "react-icons/gi";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import { RiDashboardLine, RiMore2Line } from "react-icons/ri";

import { IoStatsChartOutline } from "react-icons/io5";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdHome } from "react-icons/md";
import { useRouter } from "next/navigation";

type ValorisationProps = {
  st?: any;
  sd?: any;
  sl?: any;
};
export const Valorisation = ({ st, sd, sl }: ValorisationProps) => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center">
          <IoStatsChartOutline size={20} />
          <Button variant="empty" className="font-medium text-md">
            {st}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{st}</SheetTitle>
          <SheetDescription>{sd}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2">
          {sl?.map((el: any) => (
            <SheetClose key={el.id} asChild>
              <Button onClick={() => router.push(el.link)}>{el.title}</Button>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

type SimpleLinkProps = {
  title?: any;
  link?: any;
};

const SimpleLink = ({ title, link }: SimpleLinkProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      <RiDashboardLine size={20} />
      <Button
        onClick={() => router.push(link)}
        variant="empty"
        className="font-medium text-md"
      >
        {title}
      </Button>
    </div>
  );
};

const ListItems = [
  {
    id: 1,
    link: "/overview",
    icon: <RiDashboardLine size={20} />,
    tooltip: "Overview",
    title: "Overview",
  },

  {
    id: 2,
    link: "/valirosation",
    icon: <IoStatsChartOutline size={20} />,
    tooltip: "Analyse de la dette",
    subtitle: "Valorisation",
    subdesc: "Utiliser les pricers pour évaluer uniquement les obligations.",
    sublinks: [
      { id: 1, title: "Straight Bond", link: "/valorisation/sb1" },
      { id: 2, title: "Amortized Simple Bond", link: "/valorisation/sb2" },
      { id: 3, title: "Floating Rate Bond", link: "/valorisation/sb3" },
      { id: 4, title: "Straight Bond", link: "/valorisation/sb1" },
      { id: 5, title: "Amortized FRN", link: "/valorisation/afr" },
      { id: 6, title: "Amortized Step up Coupon", link: "/valorisation/asc" },
      { id: 7, title: "Dual Currency Bond", link: "/valorisation/dcb" },
      { id: 8, title: "Commodity Back Bond", link: "/valorisation/cbb" },
      {
        id: 9,
        title: "Amortized Commodity Back Bond",
        link: "/valorisation/acbb",
      },
      { id: 10, title: "European Option", link: "/valorisation/eo" },
      { id: 11, title: "American Option", link: "/valorisation/ao" },
      { id: 12, title: "Interest Rate Swap", link: "/valorisation/irs" },
      { id: 13, title: "Cross Currency Swap", link: "/valorisation/ccs" },
    ],
  },
];

const Sidebar = () => {
  const [expended, setExpended] = useState(true);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-2 pb-2 flex justify-between items-center">
          <div
            className={`flex items-center gap-2 overflow-hidden transition-all ${
              expended ? "w-52" : "w-0"
            }`}
          >
            <GiSuspensionBridge size={40} className="text-teal-900" />{" "}
            <p className="text-sky-600 text-xl font-semibold">
              <strong className="text-2xl">E</strong>
              <span>mergence</span>
            </p>
          </div>
          <Button onClick={() => setExpended(!expended)} variant="empty">
            {expended ? (
              <FiChevronsLeft size={30} />
            ) : (
              <FiChevronsRight size={30} />
            )}
          </Button>
        </div>
        <ul className="flex-1 px-3">
          {ListItems.map((item) => (
            <div
              key={item.id}
              className="flex relative items-center px-3 my-2 font-medium rounded-md cursor-pointer "
            >
              {!expended && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{item.icon}</TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sky-888">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <div
                className={`flex items-center gap-2 overflow-hidden transition-all ${
                  expended ? "w-52" : "w-0"
                }`}
              >
                {item.subtitle ? (
                  <Valorisation
                    st={item.subtitle}
                    sd={item.subdesc}
                    sl={item.sublinks}
                  />
                ) : (
                  <SimpleLink title={item.title} link={item.link} />
                )}
              </div>
            </div>
          ))}
        </ul>
        <div className="border-t flex p-3">
          <div className="overflow-hidden relative  w-10 h-10 rounded-full">
            <Image
              alt="bcg"
              src={avatar}
              placeholder="blur"
              quality={100}
              fill
              sizes="100vw"
              className="object-cover z-10 rounded-lg"
            />
          </div>
          <div
            className={`flex justify-between items-center ml-3 gap-2 overflow-hidden transition-all ${
              expended ? "w-52" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">RD Congo</h4>
              <span className="text-xs text-gray-600">rdcongo@gmail.com</span>
            </div>
            <RiMore2Line size={25} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

// VALORISATION
