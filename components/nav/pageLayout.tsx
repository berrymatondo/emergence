"use client";

import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import Link from "next/link";
import Title from "../title";

type PageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
  position?: string;
};
const PageLayout = ({
  title,
  description,
  position,
  children,
}: PageLayoutProps) => {
  const router = useRouter();

  const [openNav, setOpenNav] = useState(false);

  const toggleNavbar = () => {
    setOpenNav(!openNav);
  };

  return (
    <div className="md:container mx-auto max-w-screen-2xl">
      <div className="">
        {/*       <div className="bg-black/50 rounded-lg overflow-hidden relative max-sm:p-1  flex flex-col max-sm:h-[70px] h-[150px] w-full ">
        <div className="  overflow-hidden justify-between flex items-center gap-4 text-3xl md:p-10 w-full ">
          <Image
            onClick={() => router.push("/")}
            alt="home"
            src={logoicc0}
            quality={100}
            className="hover:cursor-pointer bg-gradient-to-tr from-yellow-200/40 p-2 to-transparent -2 bg-black rounded-full top-2 left-1 text-center z-5 max-sm:w-1/6 md:w-1/12 "
          />
          <Image
            alt="home"
            src={allgis}
            quality={100}
            className="absolute top-0 left-0 rounded-lg -z-10 "
          />
          <p className=" text-white max-sm:text-2xl text-6xl">
            {"Cellules d'"}
            <span className="text-orange-400 font-semibold">Impact</span>
          </p>
          <div className="hover:cursor-pointer hover:text-white flex-col items-center text-yellow-300 md:flex">
            <MdLogin
              className="mx-2 "
              onClick={() => router.push("/auth/login")}
            />
            <p className=" text-yellow-300 max-md:hidden text-sm md:text-muted">
              Se Connecter
            </p>
          </div>{" "}
        </div>
      </div> */}
        {/* <MobileNav /> */}
        {/*       <MobileAdminNav />
         */}{" "}
        {title && (
          <Title title={title} description={description} position={position} />
        )}
        <div className=" gap-4 mt-4 h-full ">
          <div className="rounded-lg bg-transparent md:p-2  ">{children}</div>
          {/*         <div className="max-md:hidden ">Ici</div>
           */}{" "}
        </div>
        <footer className="fixed w-full bottom-0 left-0 ">
          {/*           <p className="text-center text-xs text-blue-600 dark:text-white">
            &copy;{" "}
            <Link href="https://emergingmarkets.com" target="_blank">
              emergingmarkets.com{" "}
            </Link>
          </p> */}
        </footer>
      </div>
    </div>
  );
};

export default PageLayout;
