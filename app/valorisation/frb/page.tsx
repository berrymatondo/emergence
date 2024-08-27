import FloatingChoice from "@/components/valorisation/choice/floatingChoice";
import {
  getAllAmoSchedule,
  getAllCountries,
  getAllCurrencies,
} from "@/lib/_otherActions";
import React, { useState } from "react";

const FloatingRateBondPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();

  return (
    <div className="">
      <FloatingChoice
        countries={countries?.data}
        currencies={currencies?.data}
      />
    </div>
  );
};

export default FloatingRateBondPage;
