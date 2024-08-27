import ValChoice1 from "@/components/valorisation/choice/valChoice1";
import {
  getAllAmoSchedule,
  getAllCountries,
  getAllCurrencies,
} from "@/lib/_otherActions";
import React, { useState } from "react";

const SB1Page = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  const schedules = await getAllAmoSchedule();

  return (
    <div className="">
      <ValChoice1
        countries={countries?.data}
        currencies={currencies?.data}
        schedules={schedules?.data}
      />
    </div>
  );
};

export default SB1Page;
