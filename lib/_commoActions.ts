"use server";

import { z } from "zod";
import { ACommoSchema, CommoSchema } from "./schemas";
// Get all users
type Inputs = z.infer<typeof CommoSchema>;
type Inputs2 = z.infer<typeof ACommoSchema>;

export const computeGeneralCommoBond = async (
  data: Inputs,
  curve: any,
  forwardrates: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const forw = [];
  for (let i = 0; i < forwardrates.length; i++) {
    forw.push([forwardrates[i].tenor, +forwardrates[i].rate]);
  }

  //console.log("forw", forw);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    spread: data.fixedCoupon ? +data.fixedCoupon / 100 : undefined,
    coupon_max: data.maxCoupon ? +data.maxCoupon / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
    forward_curve: forw,
  });
  /* 
  console.log("X", {
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
    forward_curve: forw,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/commo_back_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

export const computeCommoYieldToMaturity = async (
  data: Inputs,
  tmp: number,
  curve: any,
  forwardrates: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const forw = [];
  for (let i = 0; i < forwardrates.length; i++) {
    forw.push([forwardrates[i].tenor, +forwardrates[i].rate]);
  }

  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
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
    spread: data.fixedCoupon ? +data.fixedCoupon / 100 : undefined,
    coupon_max: data.maxCoupon ? +data.maxCoupon / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    forward_curve: forw,
  });

  //console.log("Xcx", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/commo_back_yield_to_maturity",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    //console.log("response", response);

    let dataout = await response.json();
    //console.log("DATA", dataout);

    return {
      success: true,
      data: dataout,
    };
  } catch (error) {}
};

export const computeGeneralAmoCommoBond = async (
  data: Inputs2,
  curve: any,
  forwardrates: any,
  amoSchedules: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const amo = [];
  for (let i = 0; i < amoSchedules.length; i++) {
    amo.push([amoSchedules[i].date, +amoSchedules[i].rate / 100]);
  }

  const forw = [];
  for (let i = 0; i < forwardrates.length; i++) {
    forw.push([forwardrates[i].tenor, +forwardrates[i].rate]);
  }

  //console.log("forw", forw);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    spread: data.fixedCoupon ? +data.fixedCoupon / 100 : undefined,
    coupon_max: data.maxCoupon ? +data.maxCoupon / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
    forward_curve: forw,
    amort_frequency: data.amortizationFrequency
      ? +data.amortizationFrequency
      : undefined,
    first_amort_date: data.amortizationStartDate,
    amortization: amo,
  });
  /* 
  console.log("X", {
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
    forward_curve: forw,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/amortized_commo_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

export const computeAmoCommoYieldToMaturity = async (
  data: Inputs2,
  tmp: number,
  curve: any,
  forwardrates: any,
  amoSchedules: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const amo = [];
  for (let i = 0; i < amoSchedules.length; i++) {
    amo.push([amoSchedules[i].date, +amoSchedules[i].rate / 100]);
  }

  const forw = [];
  for (let i = 0; i < forwardrates.length; i++) {
    forw.push([forwardrates[i].tenor, +forwardrates[i].rate]);
  }

  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
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
    spread: data.fixedCoupon ? +data.fixedCoupon / 100 : undefined,
    coupon_max: data.maxCoupon ? +data.maxCoupon / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    forward_curve: forw,
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
      "http://213.165.83.130/valuation/amortized_commo_backed_yield_to_maturity",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    //console.log("response", response);

    let dataout = await response.json();
    //console.log("DATA", dataout);

    return {
      success: true,
      data: dataout,
    };
  } catch (error) {}
};
