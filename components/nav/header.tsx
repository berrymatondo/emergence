import React from "react";
import ModeToggle from "../toggle";
import MobileNav from "./mobileNav";

type HeaderProps = {
  userSession: any;
};

const Header = ({ userSession }: HeaderProps) => {
  return (
    <div className="container w-full flex justify-end max-md:justify-between max-md:items-baseline max-md:px-2 py-4">
      <MobileNav userSession={userSession} />
      <ModeToggle />
    </div>
  );
};

export default Header;
