"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useEffect, useState } from "react";

import AmeOption from "../options/ameOpt";
import EuroOption from "../options/euroOpt";

type OptionChoiceProps = {
  countries: any;
  currencies: any;
};

const OptionChoice = ({ countries, currencies }: OptionChoiceProps) => {
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
            European Option
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
            American Option
          </label>
        </div>
      </div>

      {straight ? (
        <EuroOption countries={countries} currencies={currencies} />
      ) : (
        <AmeOption countries={countries} currencies={currencies} />
      )}
    </>
  );
};

export default OptionChoice;
