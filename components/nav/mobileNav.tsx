"use client";
import React, { useState } from "react";
import {
  MdLock,
  MdLogin,
  MdLogout,
  MdMenu,
  MdOutlineDiamond,
} from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { GiPayMoney, GiSuspensionBridge } from "react-icons/gi";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import Link from "next/link";
import { IoStatsChartOutline } from "react-icons/io5";
import { RiDashboardLine, RiExchange2Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "../ui/menubar";
import { FiChevronsLeft, FiChevronsRight, FiMenu } from "react-icons/fi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu";

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
      { id: 1, title: "Straight/Amort. Bond", link: "/valorisation/simple" },
      /*       { id: 2, title: "Amortized Simple Bond", link: "/valorisation/asb" },
       */ {
        id: 3,
        title: "Floating/Amort. Rate Bond",
        link: "/valorisation/frb",
      },
      //      { id: 4, title: "Straight Bond", link: "/valorisation/sb1" },
      //{ id: 5, title: "Amortized FRN", link: "/valorisation/afr" },
      { id: 6, title: "Step up Coupon", link: "/valorisation/stepup" },
      { id: 7, title: "Dual Currency Bond", link: "/valorisation/dual" },
      {
        id: 8,
        title: "Commo/Amort. Back Bond",
        link: "/valorisation/commo",
      },
      {
        id: 10,
        title: "European/American Option",
        link: "/valorisation/options",
      },
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
        title: "Trend Analysis",
        link: "/anamp/anatend",
      },
      {
        id: 2,
        title: "Forward Curve",
        link: "/anamp/cprog",
      },
      { id: 3, title: "Global Copper Production", link: "/anamp/pmc" },
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
    tooltip: "Marché",
    subtitle: "Marché",
    subdesc: "Se tenir informé des dernières actualités des marchés.",
    sublinks: [
      {
        id: 1,
        title: "Courbes de rend mondiales",
        link: "/marche/crm",
      },
      {
        id: 2,
        title: "Courbes de rend africaines",
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
    link: "industrie",
    icon: <LiaIndustrySolid size={20} />,
    role: "AGENT",
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
  {
    id: 9,
    link: "financingCapacity",
    icon: <RiDashboardLine size={20} />,
    tooltip: "Capacité de financement",
    title: "Capacité de financement",
    role: "AGENT",
  },
  /*   {
    id: 9,
    link: "admin",
    icon: <MdLock size={20} />,
    tooltip: "Espace Admin",
    title: "Espace Admin",
  }, */
  /*   {
    id: 10,
    link: "admin",
    role: "ADMIN",
    icon: <MdLock size={20} />,
    tooltip: "Espace admin",
    title: "Espace Admin",
  }, */
];

type MobileNavProps = {
  userSession: any;
};

const MobileNav = ({ userSession }: MobileNavProps) => {
  const router = useRouter();
  return (
    <div className="md:hidden w-full py-2 flex items-center justify-between gap-4">
      <div className=" flex justify-between items-end gap-2 w-full">
        <MobileMenu userSession={userSession} />

        <div
          className={`hover:cursor-pointer flex items-start gap-2 overflow-hidden transition-all `}
          onClick={() => router.replace("/")}
        >
          <div className=" flex text-teal-700 text-xl font-semibold">
            <strong className="text-4xl">E</strong>
            <div className="leading-4 flex flex-col items-start justify-center">
              <span className="text-sm">
                <strong>M</strong>
              </span>
            </div>
          </div>
        </div>

        {userSession?.user && (
          <div className="overflow-hidden relative  w-8 h-8 rounded-full">
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
        )}

        <div
          className={` flex justify-between items-center ml-3 gap-8 overflow-hidden transition-all `}
        >
          <div className="leading-4">
            <h4 className="font-semibold">{userSession?.user?.name}</h4>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {userSession?.user?.email}
            </span>
          </div>

          {(!userSession || !userSession.user) && (
            /* <MdLogin
              className="md:hidden text-teal-600"
              onClick={() => router.push("/auth/login")}
              size={30}
            /> */
            <Badge
              onClick={() => router.push("/auth/login")}
              className="bg-green-600 text-white"
            >
              Connexion
            </Badge>
          )}
          {userSession && userSession.user && (
            <Link href="/redirout">
              {" "}
              <MdLogout className="text-red-600" size={30} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;

type MobileMenuProps = {
  userSession: any;
};
const MobileMenu = ({ userSession }: MobileMenuProps) => {
  //console.log("userSession:", userSession);
  const [expended, setExpended] = useState(false);
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MdMenu className="" size={40} />{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {ListItems.map((lik: any) =>
            lik?.sublinks ? (
              <DropdownMenuSub key={lik.id}>
                <DropdownMenuSubTrigger className="gap-2">
                  {lik.icon}
                  <span>{lik.tooltip}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {lik.sublinks.map((el: any) => (
                      <DropdownMenuItem
                        onClick={() => router.push(el.link)}
                        key={el.id}
                      >
                        <span>{el.title}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                onClick={() => router.push("/" + lik.link)}
                key={lik.id}
                className="gap-2"
              >
                {lik.icon}
                {lik.title}
              </DropdownMenuItem>
            )
          )}

          {userSession?.user.role == "ADMIN" && (
            <DropdownMenuLabel className="text-orange-500 flex gap-2">
              <MdLock size={20} /> <span>Espace Admin</span>
            </DropdownMenuLabel>
          )}
          {userSession?.user.role == "ADMIN" && <DropdownMenuSeparator />}
          {userSession?.user.role == "ADMIN" && (
            <DropdownMenuItem onClick={() => router.push("/admin/users")}>
              <span>Users</span>
            </DropdownMenuItem>
          )}
          {userSession?.user.role == "ADMIN" && (
            <DropdownMenuItem onClick={() => router.push("/admin/batches")}>
              <span>Batches</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink>Documentation</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { UserPlus } from "lucide-react";
import { LiaIndustrySolid } from "react-icons/lia";
import { BsBank, BsCurrencyExchange } from "react-icons/bs";
import { Badge } from "../ui/badge";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
