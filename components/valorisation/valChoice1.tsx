"use client";
import { Checkbox } from "@/components/ui/checkbox";
import AmortizedSimpleBond from "@/components/valorisation/amortizeSimpleBond";
import StraightBond from "@/components/valorisation/straightBond";
import React, { useEffect, useState } from "react";

type ValChoice1Props = {
  countries: any;
  currencies: any;
  schedules: any;
};

const ValChoice1 = ({ countries, currencies, schedules }: ValChoice1Props) => {
  const [straight, setStraight] = useState(true);
  const [amortized, setAmortized] = useState(false);

  return (
    <>
      <div className="max-md:mx-1 flex justify-center p-2 rounded-full border-yellow-400 gap-4 border ">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={straight}
            onCheckedChange={() => {
              setAmortized(!amortized);
              setStraight(!straight);
            }}
          />
          <label
            htmlFor="terms"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              !straight ? "text-neutral-400" : ""
            }`}
          >
            Straight Bond
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={amortized}
            onCheckedChange={() => {
              setStraight(!straight);
              setAmortized(!amortized);
            }}
          />
          <label
            htmlFor="terms"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
              !amortized ? "text-neutral-400" : ""
            }`}
          >
            Amortized Simple Bond
          </label>
        </div>
      </div>

      {straight ? (
        <StraightBond countries={countries} currencies={currencies} />
      ) : (
        <AmortizedSimpleBond
          countries={countries}
          currencies={currencies}
          schedules={schedules}
        />
      )}
    </>
  );
};

export default ValChoice1;
