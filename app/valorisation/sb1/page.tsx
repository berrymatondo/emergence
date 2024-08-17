import ValChoice1 from "@/components/valorisation/valChoice1";
import { getAllYC } from "@/lib/_ycAction";
import React, { useState } from "react";

const SB1Page = async () => {
  const yieldcurve = await getAllYC();

  return (
    <div className="">
      <ValChoice1 yieldcurve={yieldcurve?.data} />
    </div>
  );
};

export default SB1Page;
