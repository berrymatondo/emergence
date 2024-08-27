import OptionChoice from "@/components/valorisation/choice/optionChoice";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";
import React, { useState } from "react";

const OptionsPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();

  return (
    <div className="">
      <OptionChoice countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default OptionsPage;
