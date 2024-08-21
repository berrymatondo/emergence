import ValChoice1 from "@/components/valorisation/valChoice1";
import { getAllCountries } from "@/lib/_otherActions";
import React, { useState } from "react";

const SB1Page = async () => {
  const countries = await getAllCountries();

  return (
    <div className="">
      <ValChoice1 countries={countries?.data} />
    </div>
  );
};

export default SB1Page;
