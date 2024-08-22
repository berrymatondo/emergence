import ValChoice1 from "@/components/valorisation/valChoice1";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";
import React, { useState } from "react";

const SB1Page = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();

  return (
    <div className="">
      <ValChoice1 countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default SB1Page;
