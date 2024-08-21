import React from "react";
import { GiSuspensionBridge } from "react-icons/gi";

const FAV = () => {
  return (
    <div className="flex items-center justify-center">
      <GiSuspensionBridge
        className="max-md:hidden  text-sky-700 dark:text-sky-800"
        size={1000}
      />
    </div>
  );
};

export default FAV;
