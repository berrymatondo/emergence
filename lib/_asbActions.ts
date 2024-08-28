"use server";

import { z } from "zod";
import { AStraightSchema } from "./schemas";
// Get all users
type Inputs2 = z.infer<typeof AStraightSchema>;

// COMPUTE GENERAL AMORTIZATION SIMPLE BOND

export const computeGeneralAmortizedBond = async (
  data: Inputs2,
  curve: any,
  amoSchedules: any
) => {
  // console.log("in data2", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const amo = [];
  for (let i = 0; i < amoSchedules.length; i++) {
    amo.push([amoSchedules[i].date, +amoSchedules[i].rate]);
  }

  //console.log("amoSchedules ", amo);

  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100).toFixed(2)]);
  }

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
    amort_frequency: data.amortizationFrequency
      ? +data.amortizationFrequency
      : undefined,
    first_amort_date: data.amortizationStartDate,
    amortization: amo,
  });

  /*   console.log("X", {
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,

    amortization: [
      ["2025-01-01", 0.1],
      ["2026-01-01", 0.1],
      ["2027-01-01", 0.2],
      ["2028-01-01", 0.2],
    ],
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/amortized_bond_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("DATA", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

export const computeAmortizedYieldToMaturity = async (
  data: Inputs2,
  tmp: number,
  curve: any,
  amoSchedules: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const amo = [];
  for (let i = 0; i < amoSchedules.length; i++) {
    amo.push([amoSchedules[i].date, +amoSchedules[i].rate]);
  }

  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100).toFixed(2)]);
  }
  //console.log("tmpp", +tmp * 100, data.price, data.forcedBondPrice);

  let bodyContent = JSON.stringify({
    //price: data.price ? +data.price : undefined,

    price: data.forcedBondPrice
      ? data.price
        ? +data.price / 100
        : undefined
      : +tmp,
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    amort_frequency: data.amortizationFrequency
      ? +data.amortizationFrequency
      : undefined,
    first_amort_date: data.amortizationStartDate,
    amortization: amo,
  });

  //console.log("Xcx", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/amortized_bond_yield_to_maturity",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    //  console.log("response", response);

    let dataout = await response.json();
    //console.log("DATA", dataout);

    return {
      success: true,
      data: dataout,
    };
  } catch (error) {}
};
