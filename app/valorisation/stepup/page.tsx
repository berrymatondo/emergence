import StepUpCoupon from "@/components/valorisation/stepUp/stepUpCoupon";
import {
  getAllCountries,
  getAllCurrencies,
  getAllStepRates,
} from "@/lib/_otherActions";
import React, { useState } from "react";

const CommoPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  const stepuprates = await getAllStepRates();
  return (
    <div className="">
      <StepUpCoupon
        countries={countries?.data}
        currencies={currencies?.data}
        stepur={stepuprates?.data}
      />
    </div>
  );
};

export default CommoPage;
