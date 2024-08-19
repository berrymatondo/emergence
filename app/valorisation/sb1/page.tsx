import ValChoice1 from "@/components/valorisation/valChoice1";
import { getAllCountries } from "@/lib/_otherActions";
//import { getAllYC } from "@/lib/_ycAction";
import React, { useState } from "react";

const SB1Page = async () => {
  // const yieldcurve = await getAllYC();
  const countries = await getAllCountries();

  return (
    <div className="">
      {/*       <ValChoice1 yieldcurve={yieldcurve?.data} />
       */}{" "}
      <ValChoice1 countries={countries?.data} />
    </div>
  );
};

export default SB1Page;
