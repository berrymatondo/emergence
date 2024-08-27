import DualCurrencyBond from "@/components/valorisation/dualCurrency/dualCurrencyBond";
import StepUpCoupon from "@/components/valorisation/stepUp/stepUpCoupon";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";
import React, { useState } from "react";

const DualCouponBondPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  return (
    <div className="">
      <DualCurrencyBond
        countries={countries?.data}
        currencies={currencies?.data}
      />
    </div>
  );
};

export default DualCouponBondPage;
