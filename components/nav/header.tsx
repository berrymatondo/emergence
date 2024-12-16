import React from "react";
import ModeToggle from "../toggle";
import MobileNav from "./mobileNav";

type HeaderProps = {
  userSession: any;
};

const Header = ({ userSession }: HeaderProps) => {
  return (
    <div className="md:container w-full flex justify-end  px-2 py-4">
      {userSession?.user && <MobileNav userSession={userSession} />}
      <div className="max-md:hidden">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
