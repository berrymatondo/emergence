import { Button } from "@/components/ui/button";
import StraightBond from "@/components/valorisation/straightBond";
import { computeStraightBondPrice } from "@/lib/_sbActions";
import React from "react";

const SB1Page = async () => {
  /* const sbs = await fetch('http://213.165.83.130/')
console.log("sbs: " , sbs); */

  return (
    <div>
      <StraightBond />
    </div>
  );
};

export default SB1Page;
