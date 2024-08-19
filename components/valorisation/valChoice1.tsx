"use client";
import { Checkbox } from "@/components/ui/checkbox";
import AmortizedSimpleBond from "@/components/valorisation/amortizeSimpleBond";
import StraightBond from "@/components/valorisation/straightBond";
//import { getAllYC } from "@/lib/_ycAction";
import React, { useEffect, useState } from "react";

type ValChoice1Props = {
  //yieldcurve?: any;
  countries: any;
};

/* const ValChoice1 = ({ yieldcurve }: ValChoice1Props) => {
 */ const ValChoice1 = ({ countries }: ValChoice1Props) => {
  const [straight, setStraight] = useState(true);
  const [amortized, setAmortized] = useState(false);
  const [countryId, setCountryId] = useState(1);
  const [yieldcurve, setYieldcurve] = useState<any>();

  //console.log("countries", countries);

  /*   useEffect(() => {
    const fetchYC = async (id: any) => {
      const resu = await getAllYC(true, id);
      const data = resu?.data;
      setYieldcurve(data); */

  //console.log("data ", data);
  /*       console.log("data ", data);

      console.log(
        "SORT",
        data?.historicalDataCommo.sort(
          (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
        )
      ); */
  /*     };
    fetchYC(countryId);
  }, [countryId]);
 */
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
        <StraightBond countries={countries} />
      ) : (
        <AmortizedSimpleBond />
      )}
    </>
  );
};

export default ValChoice1;
