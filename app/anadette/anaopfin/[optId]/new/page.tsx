import OptAnaForm from "@/components/debtAna/optAnaForm";
import { getAllCurrencies } from "@/lib/_otherActions";
import React from "react";

const NewOptPage = async ({
  searchParams,
}: {
  searchParams: {
    valType: string;
    maturityDate: string;
    issueDate: string;
    firstCouponDate: string;
    valuationDate: string;
    couponRate: string;
    couponFrequency: string;
    notional: string;
    couponCurrency: string;
    rating: string;
    recovering: string;
    reserve: string;
  };
}) => {
  const currencies = await getAllCurrencies();
  return (
    <div>
      {/*       <NewOptForm />
       */}{" "}
      <OptAnaForm currencies={currencies?.data} optIn={searchParams} />
    </div>
  );
};

export default NewOptPage;
