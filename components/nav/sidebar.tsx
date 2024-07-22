"use client";
import React, { useState } from "react";
import { GiPayMoney, GiSuspensionBridge } from "react-icons/gi";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Button } from "../ui/button";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import { RiDashboardLine, RiExchange2Line, RiMore2Line } from "react-icons/ri";

import { IoStatsChartOutline } from "react-icons/io5";
import { BsBank, BsCurrencyExchange } from "react-icons/bs";
import { LiaIndustrySolid } from "react-icons/lia";

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
import { MdHome, MdOutlineDiamond } from "react-icons/md";
import { useRouter } from "next/navigation";

type ValorisationProps = {
  st?: any;
  sd?: any;
  sl?: any;
  ic?: any;
  ex?: any;
  tp?: any;
};
export const Valorisation = ({ st, sd, sl, ic, ex, tp }: ValorisationProps) => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex items-center">
          {ex ? (
            <>
              {ic}
              <Button variant="empty" className="font-medium text-md">
                {st}
              </Button>
            </>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Button variant="empty" className="font-medium text-md">
                    {ic}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
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
  ex?: any;
  tp?: any;
};

const SimpleLink = ({ title, link, ex, tp }: SimpleLinkProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center">
      {ex ? (
        <>
          <RiDashboardLine size={20} />
          <Button
            onClick={() => router.push(link)}
            variant="empty"
            className="font-medium text-md"
          >
            {title}
          </Button>
        </>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <Button
                onClick={() => router.push(link)}
                variant="empty"
                className="font-medium text-md"
              >
                <RiDashboardLine size={20} />
              </Button>
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
    link: "/overview",
    icon: <RiDashboardLine size={20} />,
    tooltip: "Overview",
    title: "Overview",
  },

  {
    id: 2,
    link: "/valirosation",
    icon: <IoStatsChartOutline size={20} />,
    tooltip: "Valorisation",
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
  {
    id: "3",
    link: "/anadette",
    icon: <GiPayMoney size={20} />,
    tooltip: "Analyse de la dette",
    subtitle: "Analyse de la dette",
    subdesc:
      " Estimer la croissance, analyser différents scénarios et distribuer la dette.",
    sublinks: [
      {
        id: 1,
        title: "Analyse des options de financement",
        link: "/anadette/anaopfin",
      },
      {
        id: 2,
        title: "Evaluation d'une option de financement",
        link: "/anadette/evaopfin",
      },
      { id: 3, title: "Soutenabilité de la dette", link: "/anadette/soudet" },
      { id: 4, title: "Analyse des scénarios", link: "/anadette/anascen" },
      { id: 5, title: "Distribution de la dette", link: "/anadette/disdet" },
    ],
  },
  {
    id: "4",
    link: "/anadev",
    icon: <BsCurrencyExchange size={20} />,
    tooltip: "Analyse de devise",
    subtitle: "Analyse de devise",
    subdesc:
      "Suivre les tendances, oscillations, volatilité, projections et impacts des devises sur la dette.",
    sublinks: [
      {
        id: 1,
        title: "Analyse de tendance ",
        link: "/anadev/anatend",
      },
      {
        id: 2,
        title: "Analyse d'oscillation",
        link: "/anadev/anaosci",
      },
      { id: 3, title: "Analyse de volatilité", link: "/anadev/anavol" },
      { id: 4, title: "Projection du cours de change", link: "/anadev/projcc" },
      {
        id: 5,
        title: "Taux de change et option de financement",
        link: "/anadev/tcopfin",
      },
    ],
  },
  {
    id: "5",
    link: "/anamp",
    icon: <MdOutlineDiamond size={20} />,
    tooltip: "Analyse des matières premières",
    subtitle: "Analyse des matières premières",
    subdesc:
      "Examiner les tendances, volatilité, projections et impacts des matières premières sur la dette.",
    sublinks: [
      {
        id: 1,
        title: "Analyse de tendance ",
        link: "/anamp/anatend",
      },
      {
        id: 2,
        title: "Courbe de progression",
        link: "/anamp/cprog",
      },
      { id: 3, title: "Production Mondiale Cuivre", link: "/anamp/pmc" },
      { id: 4, title: "Production Mondiale Or", link: "/anamp/pmo" },
      {
        id: 5,
        title: "Production Mondiale Argent",
        link: "/anamp/pma",
      },
      {
        id: 6,
        title: "Production Mondiale Cobalt et Diamant",
        link: "/anamp/pmcd",
      },
    ],
  },
  {
    id: "6",
    link: "/banque",
    icon: <BsBank size={20} />,
    tooltip: "Banque Centrale",
    subtitle: "Banque Centrale",
    subdesc: "Comparer les taux directeurs et calculer l'inflation anticipée.",
    sublinks: [
      {
        id: 1,
        title: "Taux directeur",
        link: "/banque/tdir",
      },
      {
        id: 2,
        title: "Inflation anticipée",
        link: "/banque/infa",
      },
    ],
  },
  {
    id: "7",
    link: "/marche",
    icon: <RiExchange2Line size={20} />,
    tooltip: "Marché",
    subtitle: "Marché",
    subdesc: "Se tenir informé des dernières actualités des marchés.",
    sublinks: [
      {
        id: 1,
        title: "Courbes de rendement mondiales",
        link: "/marche/crm",
      },
      {
        id: 2,
        title: "Courbes de rendement africaines",
        link: "/marche/cra",
      },
      { id: 3, title: "Marché africain", link: "/marche/maf" },
      { id: 4, title: "Marché des actions", link: "/marche/mac" },
      {
        id: 5,
        title: "Aperçu par secteur",
        link: "/marche/apsec",
      },
    ],
  },
  {
    id: "8",
    link: "/industrie",
    icon: <LiaIndustrySolid size={20} />,
    tooltip: "Industrie",
    subtitle: "Industrie",
    subdesc: "Suivre le marché de l'industrie",
    sublinks: [
      {
        id: 1,
        title: "Ressources Naturelles",
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
];

const Sidebar = () => {
  const [expended, setExpended] = useState(true);
  const router = useRouter();
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-2 pb-2 flex justify-between items-center">
          <div
            className={`hover:cursor-pointer flex items-center gap-2 overflow-hidden transition-all ${
              expended ? "w-52" : "w-0"
            }`}
            onClick={() => router.push("/")}
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
              className={`flex relative items-center my-2 font-medium rounded-md cursor-pointer ${
                expended ? " px-3" : "px-0"
              }`}
            >
              {/*               {!expended && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{item.icon}</TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sky-888">{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )} */}
              <div
                className={`flex items-center gap-2 overflow-hidden transition-all ${
                  expended ? "w-68" : "w-10"
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
                  />
                ) : (
                  <SimpleLink
                    title={item.title}
                    link={item.link}
                    ex={expended}
                    tp={item.tooltip}
                  />
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
