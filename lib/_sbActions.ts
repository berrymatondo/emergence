"use server";

import { SBSchema } from "./schemas";
import { z } from "zod";
// Get all users
type Inputs = z.infer<typeof SBSchema>;

export const computeStraightBondPrice = async (data: Inputs) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  /*   const maturity_date = "2030-01-01";
  const payment_frequency = 1;
  const coupon_rate = 0.05;
  const first_coupon_date = "2023-01-01";
  const valuation_date = "2024-07-01";
  const day_count_convention = "AA";
 */
  /*     {
    bondMaturityDate: '2024-07-30',
    couponCurrency: 'USD',
    couponRate: '0.00',
    couponFrequency: '1',
    firstCouponDate: '2024-07-30',
    couponBasis: 'AA',
    valuationDate: '2024-07-30',
    notional: ''
  } */
  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ],
    day_count_convention: data.couponBasis,
    notional: data.notional,
  });

  //console.log("X", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_price",
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

export const computeAccruedInterest = async (data: Inputs) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ],
    day_count_convention: data.couponBasis,
  });

  //console.log("X", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_accrued_interest",
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

export const computeYieldToMaturity = async (data: Inputs, tmp: number) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  //console.log("tmpp", +tmp * 100, data.price, data.forcedBondPrice);

  let bodyContent = JSON.stringify({
    //price: data.price ? +data.price : undefined,

    price: data.forcedBondPrice
      ? data.price
        ? +data.price
        : undefined
      : +tmp * 100,
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ],
    day_count_convention: data.couponBasis,
  });

  //console.log("Xcx", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_yield_to_maturity",
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

export const computeDuration = async (data: Inputs) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ],
    day_count_convention: data.couponBasis,
  });

  //console.log("X", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_duration",
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

export const computeStraight_bond_cash_flow = async (data: Inputs) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ],
    day_count_convention: data.couponBasis,
  });

  //console.log("X", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_cash_flow",
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
