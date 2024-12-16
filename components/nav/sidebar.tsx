"use client";
import React, { useState } from "react";
import { GiPayMoney, GiSuspensionBridge, GiTakeMyMoney } from "react-icons/gi";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import { RiDashboardLine, RiExchange2Line, RiMore2Line } from "react-icons/ri";
import { GrUserAdmin } from "react-icons/gr";

import { IoStatsChartOutline } from "react-icons/io5";
import { BsBank, BsCurrencyExchange } from "react-icons/bs";
import { LiaIndustrySolid } from "react-icons/lia";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

import {
  MdAdminPanelSettings,
  MdExitToApp,
  MdLock,
  MdLogin,
  MdLogout,
  MdOutlineDiamond,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type ValorisationProps = {
  st?: any;
  sd?: any;
  sl?: any;
  ic?: any;
  ex?: any;
  tp?: any;
  chem?: any;
  lk?: any;
  item?: any;
};
export const Valorisation = ({
  st,
  sd,
  sl,
  ic,
  ex,
  tp,
  chem,
  lk,
  item,
}: ValorisationProps) => {
  //console.log("sb", st);
  //console.log("sb", chem);
  //console.log("item.link", item.link);

  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div
          className={`flex items-center ${lk == chem ? "text-sky-600" : ""} `}
        >
          {ex ? (
            <div className="ml-1 flex items-center">
              {ic}
              <Button variant="empty" className="font-medium text-md">
                {st}
              </Button>
            </div>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Button variant="empty" className="font-medium text-md ml-1">
                    {ic}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-sky-888">{tp}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{st}</SheetTitle>
          <SheetDescription>{sd}</SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 my-8">
          {sl?.map((el: any) => (
            <SheetClose key={el.id} asChild>
              <Button
                className="dark:text-white bg-sky-700"
                onClick={() => router.replace(el.link)}
              >
                {el.title}
              </Button>
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
  ex?: any;
  tp?: any;
  chem?: any;
  icon?: any;
  role?: any;
};

const SimpleLink = ({
  title,
  link,
  ex,
  tp,
  chem,
  icon,
  role,
}: SimpleLinkProps) => {
  const router = useRouter();

  //console.log("link", link);

  //${chem == "valorisation" ? "bg-green-600" : ""}

  return (
    <div
      className={`flex items-center ${
        link == chem ? "text-sky-600 rounded-lg " : ""
      }`}
    >
      {ex ? (
        <>
          <Link
            href={"/" + link}
            className={`flex gap-4 m-1 ${
              role == "ADMIN" ? "text-orange-500" : ""
            }`}
          >
            {icon}
            <p className="font-medium text-md">{title}</p>{" "}
          </Link>
          {/*           <RiDashboardLine size={20} />
          <Button
            onClick={() => router.replace(link)}
            variant="empty"
            className="font-medium text-md"
          >
            {title}
          </Button> */}
        </>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href={"/" + link} className="flex gap-4 m-1 pl-4">
                {icon}
                <p className="font-medium text-md">{title}</p>{" "}
              </Link>
              {/*               <Button
                onClick={() => router.replace(link)}
                variant="empty"
                className="font-medium text-md"
              >
                <RiDashboardLine size={20} />
              </Button> */}
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sky-888">{tp}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

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
    tooltip: "Valuation",
    subtitle: "Valuation",
    subdesc:
      "Utiliser les pricers pour évaluer les obligations et les options.",
    sublinks: [
      { id: 1, title: "Straight/Amortized Bond", link: "/valorisation/simple" },
      /*       { id: 2, title: "Amortized Simple Bond", link: "/valorisation/asb" },
       */ {
        id: 3,
        title: "Floating/Amortized Rate Bond",
        link: "/valorisation/frb",
      },
      //      { id: 4, title: "Straight Bond", link: "/valorisation/sb1" },
      //{ id: 5, title: "Amortized FRN", link: "/valorisation/afr" },
      { id: 6, title: "Step up Coupon", link: "/valorisation/stepup" },
      { id: 7, title: "Dual Currency Bond", link: "/valorisation/dual" },
      {
        id: 8,
        title: "Commo/Amortized Back Bond",
        link: "/valorisation/commo",
      },
      /*       {
        id: 9,
        title: "Amortized Commodity Back Bond",
        link: "/valorisation/acbb",
      }, */
      {
        id: 10,
        title: "European/American Option",
        link: "//options",
      },
      //{ id: 11, title: "American Option", link: "/valorisation/ao" },
      //  { id: 12, title: "Interest Rate Swap", link: "/valorisation/irs" },
      //  { id: 13, title: "Cross Currency Swap", link: "/valorisation/ccs" },
    ],
  },
  {
    id: "3",
    link: "anadette",
    icon: <GiPayMoney size={20} />,
    role: "AGENT",
    tooltip: "Debt Analysis",
    subtitle: "Debt Analysis",
    subdesc:
      " Estimer la croissance, analyser différents scénarios et distribuer la dette.",
    sublinks: [
      {
        id: 1,
        title: "Financing Options Analysis",
        link: "/anadette/anaopfin",
      },
      {
        id: 2,
        title: "Evaluation of a Financing Option",
        link: "/anadette/evaopfin",
      },
      { id: 3, title: "Debt Sustainability", link: "/anadette/soudet" },
      { id: 4, title: "Scenario Analysis", link: "/anadette/anascen" },
      { id: 5, title: "Debt Distribution", link: "/anadette/disdet" },
    ],
  },
  {
    id: "4",
    link: "anadev",
    icon: <BsCurrencyExchange size={20} />,
    role: "AGENT",
    tooltip: "Currency Analysis",
    subtitle: "Currency Analysis",
    subdesc:
      "Suivre les tendances, oscillations, volatilité, projections et impacts des devises sur la dette.",
    sublinks: [
      {
        id: 1,
        title: "Trend Analysis",
        link: "/anadev/anatend",
      },
      {
        id: 2,
        title: "Oscillation Analysis",
        link: "/anadev/anaosci",
      },
      { id: 3, title: "Volatility Analysis", link: "/anadev/anavol" },
      { id: 4, title: "Exchange Rate Projection", link: "/anadev/projcc" },
      {
        id: 5,
        title: "Exchange Rate and Financing Option",
        link: "/anadev/tcopfin",
      },
    ],
  },
  {
    id: "5",
    link: "anamp",
    icon: <MdOutlineDiamond size={20} />,
    role: "AGENT",
    tooltip: "Commodities Analysis",
    subtitle: "Commodities Analysis",
    subdesc:
      "Examiner les tendances, volatilité, projections et impacts des matières premières sur la dette.",
    sublinks: [
      {
        id: 1,
        title: "Trend Analysis ",
        link: "/anamp/anatend",
      },
      {
        id: 2,
        title: "Forward Curve",
        link: "/anamp/cprog",
      },
      { id: 3, title: "Global Copper Productione", link: "/anamp/pmc" },
      { id: 4, title: "Global Gold Production", link: "/anamp/pmo" },
      {
        id: 5,
        title: "Global Silver Production",
        link: "/anamp/pma",
      },
      {
        id: 6,
        title: "Global Cobalt and Diamond Production",
        link: "/anamp/pmcd",
      },
    ],
  },
  {
    id: "6",
    link: "banque",
    icon: <BsBank size={20} />,
    role: "AGENT",
    tooltip: "Central Bank",
    subtitle: "Central Bank",
    subdesc: "Comparer les taux directeurs et calculer l'inflation anticipée.",
    sublinks: [
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
  {
    id: "7",
    link: "marche",
    icon: <RiExchange2Line size={20} />,
    role: "AGENT",
    tooltip: "Market",
    subtitle: "Market",
    subdesc: "Se tenir informé des dernières actualités des marchés.",
    sublinks: [
      {
        id: 1,
        title: "Global Yield Curves",
        link: "/marche/crm",
      },
      {
        id: 2,
        title: "African Yield Curves",
        link: "/marche/cra",
      },
      { id: 3, title: "African Bond Market ", link: "/marche/maf" },
      { id: 4, title: "Stock Market ", link: "/marche/mac" },
      {
        id: 5,
        title: "Sector Overview",
        link: "/marche/apsec",
      },
    ],
  },
  {
    id: "8",
    link: "industrie",
    icon: <LiaIndustrySolid size={20} />,
    role: "AGENT",
    tooltip: "Industry",
    subtitle: "Industry",
    subdesc: "Suivre le marché de l'industrie",
    sublinks: [
      {
        id: 1,
        title: "Natural Resources",
        link: "/industrie/rn",
      },
      {
        id: 2,
        title: "Agriculture",
        link: "/industrie/agri",
      },
      { id: 3, title: "Energie", link: "/industrie/ener" },
    ],
  },
  {
    id: 9,
    link: "financingCapacity",
    icon: <GiTakeMyMoney size={20} />,
    tooltip: "Financing Capacity",
    title: "Financing Capacity",
  },
  {
    id: 10,
    link: "admin",
    role: "ADMIN",
    icon: <MdLock size={20} />,
    tooltip: "Espace admin",
    title: "Espace Admin",
  },
];

type SidebarProps = {
  userSession: any;
};

const Sidebar = ({ userSession }: SidebarProps) => {
  const [expended, setExpended] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const chem = pathname?.split("/")[1].split("/")[0];
  const [connected, setConnected] = useState(true);

  //console.log("USER", userSession?.user);

  return (
    <aside className="max-md:hidden min-h-screen bg-black/70 ">
      {userSession?.user && (
        <nav className=" relative h-full flex flex-col  border-r shadow-sm">
          <div className="p-2 pb-2 flex justify-between items-center">
            <div className="flex p-3 mb-8 ">
              <div className="overflow-hidden relative  w-10 h-10 rounded-full">
                {userSession?.user.role == "AGENT" ? (
                  <Image
                    alt="bcg"
                    src={avatar}
                    placeholder="blur"
                    quality={100}
                    fill
                    sizes="100vw"
                    className="object-cover z-10 rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-sky-600 flex justify-center items-center font-bold text-gray-200">
                    AD
                  </div>
                )}
              </div>

              <div
                className={`flex justify-between items-center  mx-3 gap-2 overflow-hidden transition-all ${
                  expended ? "w-52" : "w-0"
                }`}
              >
                <div className="leading-4">
                  <h4 className="font-semibold">{userSession?.user?.name}</h4>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {userSession?.user?.email}
                  </span>
                </div>

                {(!userSession || !userSession.user) && (
                  <MdLogin
                    className="md:hidden text-teal-600"
                    onClick={() => router.push("/auth/login")}
                    size={30}
                  />
                )}
                {userSession && userSession.user && (
                  <Link href="/redirout">
                    {" "}
                    <MdLogout className="text-red-600" size={30} />
                  </Link>
                )}
              </div>
              <Button
                className="p-2 rounded-full absolute -right-5 bg-slate-200/30 dark:bg-neutral-400/40 dark:text-card"
                onClick={() => setExpended(!expended)}
                variant="empty"
              >
                {expended ? (
                  <FiChevronsLeft className="text-white" size={25} />
                ) : (
                  <FiChevronsRight className="text-white" size={25} />
                )}
              </Button>
            </div>
          </div>

          <ul className="flex-1 px-3 mt-8">
            {ListItems.map((item) => (
              <div
                key={item.id}
                className={`text-white hover:text-sky-400 flex relative items-center my-2 font-medium rounded-md cursor-pointer ${
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
                      chem={chem}
                      lk={item.link}
                      item={item}
                    />
                  ) : (
                    <SimpleLink
                      title={item.title}
                      link={item.link}
                      ex={expended}
                      tp={item.tooltip}
                      chem={chem}
                      icon={item.icon}
                      role={item.role}
                    />
                  )}
                </div>
              </div>
            ))}

            {/*             <Button
              className="p-2 rounded-full absolute -right-5 bg-slate-200 dark:bg-neutral-100 dark:text-card"
              onClick={() => setExpended(!expended)}
              variant="empty"
            >
              {expended ? (
                <FiChevronsLeft size={25} />
              ) : (
                <FiChevronsRight size={25} />
              )}
            </Button> */}
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
