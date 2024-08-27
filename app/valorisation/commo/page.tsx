import CommoChoice from "@/components/valorisation/choice/commoChoice";
import {
  getAllAmoSchedule,
  getAllCountries,
  getAllCurrencies,
} from "@/lib/_otherActions";
import React, { useState } from "react";

const CommoPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  const schedules = await getAllAmoSchedule();

  return (
    <div className="">
      <CommoChoice
        countries={countries?.data}
        currencies={currencies?.data}
        schedules={schedules?.data}
      />
    </div>
  );
};

export default CommoPage;
