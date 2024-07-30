import React from "react";
import { MdMenu } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { GiSuspensionBridge } from "react-icons/gi";
import avatar from "../../public/rdc.png";
import Image from "next/image";
import Link from "next/link";

type MobileNavProps = {
  userSession: any;
};

const MobileNav = ({ userSession }: MobileNavProps) => {
  return (
    <div className="md:hidden flex">
      <MobileMenu userSession={userSession} />
      <>
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
      </>
    </div>
  );
};

export default MobileNav;

type MobileMenuProps = {
  userSession: any;
};
const MobileMenu = ({ userSession }: MobileMenuProps) => {
  // console.log("userSession:", userSession);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {" "}
          <MdMenu size={30} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white/10 border-none">
        <Button>lien 1</Button>
        {/*         <aside className="max-md:hidden min-h-screen ">
          {userSession?.user && (
            <nav className="h-full flex flex-col  border-r shadow-sm">


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
          </ul>
            </nav>
          )}
        </aside> */}
      </PopoverContent>
    </Popover>
  );
};
