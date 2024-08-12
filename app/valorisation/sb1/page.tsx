"use client";
import { Checkbox } from "@/components/ui/checkbox";
import AmortizedSimpleBond from "@/components/valorisation/amortizeSimpleBond";
import StraightBond from "@/components/valorisation/straightBond";
import React, { useState } from "react";

const SB1Page = () => {
  const [straight, setStraight] = useState(true);
  const [amortized, setAmortized] = useState(false);
  return (
    <div className="">
      <div className="flex justify-center p-2 rounded-full border-yellow-400 gap-4 border ">
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

      {straight ? <StraightBond /> : <AmortizedSimpleBond />}
    </div>
  );
};

export default SB1Page;
