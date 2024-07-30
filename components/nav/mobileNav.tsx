"use client";
import React, { useState } from "react";
import { MdLogin, MdLogout, MdMenu } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { GiSuspensionBridge } from "react-icons/gi";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import Link from "next/link";
import { IoStatsChartOutline } from "react-icons/io5";
import { RiDashboardLine } from "react-icons/ri";
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
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
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
  const [expended, setExpended] = useState(false);
  const router = useRouter();

  return (
    <div>
      <MdMenu onClick={() => setExpended(!expended)} size={30} />
      {expended && <NavigationMenuDemo />}
      {/*       <Menubar>
        <MenubarMenu>
          <MenubarTrigger>
            {" "}
            <MdMenu className="" size={30} />
          </MenubarTrigger>
          <MenubarContent>

            <ul className="flex-1 px-3 mt-4">
              {ListItems.map((item) => (
                <div>
                  <MenubarSeparator />
                  <MenubarItem>
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
                  </MenubarItem>
                </div>
              ))}

            </ul>
          </MenubarContent>
        </MenubarMenu>
      </Menubar> */}
      {/*       <Popover>
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
 */}
      {/*       <aside className="md:hidden min-h-screen ">
        {userSession?.user && (
          <nav className="h-full flex flex-col  border-r shadow-sm">
            <div className="p-2 pb-2 flex justify-between items-center">
              <div className="flex flex-col ml-4">
                <div
                  className={`hover:cursor-pointer flex items-start gap-2 overflow-hidden transition-all ${
                    expended ? "w-52" : "w-0"
                  }`}
                  onClick={() => router.replace("/")}
                >
                  <GiSuspensionBridge size={40} className="text-sky-600" />{" "}
                  <div className=" flex text-teal-700 text-xl font-semibold">
                    <strong className="text-4xl">E</strong>
                    <div className="leading-4 flex flex-col items-start justify-center">
                      <span className="pt-1">merging</span>
                      <span className="text-sm">
                        <strong>M</strong>arkets
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={() => setExpended(!expended)} variant="empty">
                {expended ? (
                  <FiChevronsLeft size={30} />
                ) : (
                  <FiChevronsRight size={30} />
                )}
              </Button>
            </div>

            <div className="border-t flex p-3 mb-8">
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
                className={`flex justify-between items-center ml-3 gap-2 overflow-hidden transition-all ${
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
            </div>

            <ul className="flex-1 px-3 mt-8">
              {ListItems.map((item) => (
                <div
                  key={item.id}
                  className={`text-gray-600 hover:text-sky-400 flex relative items-center my-2 font-medium rounded-md cursor-pointer ${
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
                        //chem={chem}
                        icon={item.icon}
                        role={item.role}
                      />
                    )}
                  </div>
                </div>
              ))}
            </ul>
          </nav>
        )}
      </aside> */}
    </div>
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
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
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
