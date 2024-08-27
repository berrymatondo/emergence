import StepUpCoupon from "@/components/valorisation/stepUp/stepUpCoupon";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";
import React, { useState } from "react";

const CommoPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  return (
    <div className="">
      <StepUpCoupon countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default CommoPage;
