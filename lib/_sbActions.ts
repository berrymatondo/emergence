"use server";

import { SBSchema } from "./schemas";
import { z } from "zod";
// Get all users
type Inputs = z.infer<typeof SBSchema>;

export const computeStraightBondPrice = async (data: Inputs, curve: any) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("curve", curve);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100).toFixed(2)]);
  }

  //console.log("discount_curve", discount_curve);

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
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    /*     discount_curve: [
      [0.5, 0.02],
      [1.0, 0.025],
      [1.5, 0.03],
      [2.0, 0.035],
      [2.5, 0.04],
    ], */
    discount_curve: discount_curve,
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

export const computeAccruedInterest = async (data: Inputs, curve: any) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

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

export const computeYieldToMaturity = async (
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
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100).toFixed(2)]);
  }
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

export const computeDuration = async (data: Inputs, curve: any) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

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

export const computeStraight_bond_cash_flow = async (
  data: Inputs,
  curve: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

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

// Compute Discounted Curve
export const computeDiscountCurve = async (
  data: Inputs,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
  //console.log("discdisc", disc);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let s1 = [];
  let s2 = [];
  const liquidity = data.liquidityPremium ? +data.liquidityPremium : 0;
  let val2 = 0;
  let val3 = 0;

  if (curveType == "zcc") {
    let c1 = [];
    let c2 = [];
    // ZC CURVE
    for (let i = 0; i < zcrates?.length; i++) {
      c1.push([+zcrates[i].tenor, +zcrates[i].rate]);
    }

    //console.log("C1", c1);
    //console.log("disc", disc);
    //console.log("disc.lenhtg", disc?.length);

    for (let j = 0; j < disc?.length; j++) {
      let bodyContent = JSON.stringify({
        curve: c1,
        time: disc[j].tenor,
      });

      //console.log("content", { curve: c1, time: disc[j].tenor });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        s1.push({ tenor: disc[j].tenor, rate: dataout });
      } catch (error) {}
    }

    //console.log("S1", s1);

    // + SPREAD CURVE
    //   console.log("creditSpread:", creditSpread);

    // const liquidity = data.liquidityPremium ? +data.liquidityPremium : 0;

    //    console.log("data.liquidityPremium", liquidity);

    for (let i = 0; i < creditSpread?.length; i++) {
      c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
    }

    for (let j = 0; j < disc?.length; j++) {
      let bodyContent = JSON.stringify({
        curve: c2,
        time: +disc[j].tenor,
      });

      // console.log("CONT", { curve: c2, time: disc[j].tenor });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        s2.push({
          id: disc[j].id,
          tenor: disc[j].tenor,
          rate: +dataout + s1[j].rate + liquidity,
          rateOut: (+dataout + s1[j].rate + liquidity) * 100,
        });

        //console.log("S2", s2);
      } catch (error) {}
    }
    /* 
    let c2 = [];
    if (curveType == "yic") {
      for (let i = 0; i < yieldcurve?.length; i++) {
        c2.push([yieldcurve[i].tenor, yieldcurve[i].yield]);
      }
    }

    let c3 = [];
    if (curveType == "inc") {
      for (let i = 0; i < inputCurve?.length; i++) {
        c3.push([inputCurve[i].tenor, inputCurve[i].rate]);
      }
    } */
  } else {
    if (curveType == "yic") {
      let c1 = [];

      for (let i = 0; i < yieldcurve?.length; i++) {
        c1.push([+yieldcurve[i].tenor, +yieldcurve[i].yield]);
      }

      for (let j = 0; j < disc?.length; j++) {
        let bodyContent = JSON.stringify({
          curve: c1,
          time: disc[j].tenor,
        });

        try {
          let response = await fetch(
            "http://213.165.83.130/metrics/interpolation_lineaire",
            {
              method: "POST",
              body: bodyContent,
              headers: headersList,
            }
          );

          let dataout = await response.json();

          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout + liquidity,
            rateOut: (+dataout + liquidity) * 100,
          });
        } catch (error) {}
      }
    } else {
      console.log("inputCurve", inputCurve);
      let c1 = [];
      let c2 = [];
      // INPUT CURVE
      for (let i = 0; i < inputCurve?.length; i++) {
        c1.push([+inputCurve[i].tenor, +inputCurve[i].rate]);
      }

      for (let j = 0; j < disc?.length; j++) {
        let bodyContent = JSON.stringify({
          curve: c1,
          time: disc[j].tenor,
        });

        //console.log("content", { curve: c1, time: disc[j].tenor });

        try {
          let response = await fetch(
            "http://213.165.83.130/metrics/interpolation_lineaire",
            {
              method: "POST",
              body: bodyContent,
              headers: headersList,
            }
          );

          let dataout = await response.json();

          s1.push({ tenor: disc[j].tenor, rate: dataout });
        } catch (error) {}
      }

      //console.log("S1", s1);

      // + SPREAD CURVE
      //   console.log("creditSpread:", creditSpread);

      // const liquidity = data.liquidityPremium ? +data.liquidityPremium : 0;

      //    console.log("data.liquidityPremium", liquidity);

      for (let i = 0; i < creditSpread?.length; i++) {
        c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
      }

      for (let j = 0; j < disc?.length; j++) {
        let bodyContent = JSON.stringify({
          curve: c2,
          time: +disc[j].tenor,
        });

        // console.log("CONT", { curve: c2, time: disc[j].tenor });

        try {
          let response = await fetch(
            "http://213.165.83.130/metrics/interpolation_lineaire",
            {
              method: "POST",
              body: bodyContent,
              headers: headersList,
            }
          );

          let dataout = await response.json();

          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout + s1[j].rate + liquidity,
            rateOut: (+dataout + s1[j].rate + liquidity) * 100,
          });

          //console.log("S2", s2);
        } catch (error) {}
      }
    }
  }

  //console.log("S22", s2);

  return {
    success: true,
    data: s2,
  };

  /*   let bodyContent = JSON.stringify({
    maturity_date: data.bondMaturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
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
  }); */

  //console.log("X", bodyContent);

  //BOND PRICE
  /*   try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_cash_flow",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );
 */
  //  console.log("response", response);

  // let dataout = await response.json();
  //console.log("DATA", dataout);

  /*     return {
      success: true,
      data: dataout,
    };
  } catch (error) {} */
};
