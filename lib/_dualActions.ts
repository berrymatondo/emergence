"use server";

import { z } from "zod";
import { SBSchema } from "./schemas";

type Inputs = z.infer<typeof SBSchema>;
type Inputs2 = z.infer<typeof SBSchema>;

// COMPUTE GENERAL AMORTIZATION SIMPLE BOND

export const computeGeneralDualBond = async (
  data: Inputs,
  curve: any,
  curve_coupon: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("curve", curve);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  let discount_curve_coupon = [];
  for (let i = 0; i < curve_coupon.length; i++) {
    discount_curve_coupon.push([
      curve_coupon[i].tenor,
      +(curve_coupon[i].rate / 100),
    ]);
  }

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve_principal: discount_curve,
    discount_curve_coupon: discount_curve_coupon,
    day_count_convention: data.couponBasis,
    notional: data.notional,
  });

  /*   console.log("X", {
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve_principal: discount_curve,
    discount_curve_coupon: discount_curve_coupon,
    day_count_convention: data.couponBasis,
    notional: data.notional,
  });
 */
  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/dual_currency_valuation",
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

export const computeDualYieldToMaturity = async (
  data: Inputs,
  tmp: number,
  curve: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

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
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
  });

  //console.log("Xcx", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/dual_currency_yield_to_maturity",
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
