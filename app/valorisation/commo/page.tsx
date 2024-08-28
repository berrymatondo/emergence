import CommoChoice from "@/components/valorisation/choice/commoChoice";
import {
  getAllAmoCommoSchedule,
  getAllAmoSchedule,
  getAllCommoForwardRates,
  getAllCountries,
  getAllCurrencies,
} from "@/lib/_otherActions";
import React, { useState } from "react";

const CommoPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  const commoFRates = await getAllCommoForwardRates();
  const schedules = await getAllAmoCommoSchedule();

  return (
    <div className="">
      <CommoChoice
        countries={countries?.data}
        currencies={currencies?.data}
        commoFRates={commoFRates?.data}
        schedules={schedules?.data}
      />
    </div>
  );
};

export default CommoPage;
