"use server";

import { z } from "zod";
import { AmericSchema, EuroSchema } from "./schemas";
import AmeOption from "@/components/valorisation/options/ameOpt";
// Get all users
type Inputs = z.infer<typeof EuroSchema>;
type Inputs2 = z.infer<typeof AmericSchema>;

// Compute Discounted Curve
export const computeEuroOptionDiscountCurve = async (
  data: Inputs,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
  //  console.log("discdisc", disc);

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
    let c3 = [];

    // Compute ZC CURVE valuation
    for (let i = 0; i < zcrates?.length; i++) {
      c1.push([+zcrates[i].tenor, +zcrates[i].rate]);
    }

    for (let j = 0; j < disc?.length; j++) {
      c3.push(+disc[j].tenor);
    }

    let bodyContent = JSON.stringify({
      curve: c1,
      time: c3,
    });

    try {
      let response = await fetch(
        "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let dataout = await response.json();

      // Format ZC Curve valuation output
      for (let j = 0; j < disc?.length; j++) {
        s1.push({ tenor: disc[j].tenor, rate: dataout[j] });
      }
    } catch (error) {}

    // Compute Spread Valuation

    for (let i = 0; i < creditSpread?.length; i++) {
      c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
    }

    let bodyContent2 = JSON.stringify({
      curve: c2,
      time: c3,
    });

    try {
      // console.log("ici");

      let response2 = await fetch(
        "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
        {
          method: "POST",
          body: bodyContent2,
          headers: headersList,
        }
      );

      let dataout2 = await response2.json();

      // Format Spread curve  valuation output
      for (let j = 0; j < disc?.length; j++) {
        s2.push({
          id: disc[j].id,
          tenor: disc[j].tenor,
          rate: +dataout2[j] + s1[j].rate + liquidity,
          rateOut: (+dataout2[j] + s1[j].rate + liquidity) * 100,
        });
      }
    } catch (error) {}
  } else {
    if (curveType == "yic") {
      let c1 = [];
      let c3 = [];

      // Compute Yield Curve
      for (let i = 0; i < yieldcurve?.length; i++) {
        c1.push([+yieldcurve[i].tenor, +yieldcurve[i].yield]);
      }

      for (let j = 0; j < disc?.length; j++) {
        c3.push(+disc[j].tenor);
      }

      let bodyContent = JSON.stringify({
        curve: c1,
        time: c3,
      });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        // console.log("dataout", dataout);

        // Format Yield Curve valuation output
        for (let j = 0; j < disc?.length; j++) {
          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout[j] + liquidity,
            rateOut: (+dataout[j] + liquidity) * 100,
          });
        }

        //  console.log("S2", s2);
      } catch (error) {}
    } else {
      // Compute Input curve valuation
      console.log("inputCurve", inputCurve);
      let c1 = [];
      let c2 = [];
      let c3 = [];

      // Compute INPUT CURVE valuation
      for (let i = 0; i < inputCurve?.length; i++) {
        c1.push([+inputCurve[i].tenor, +inputCurve[i].rate]);
      }

      for (let j = 0; j < disc?.length; j++) {
        c3.push(+disc[j].tenor);
      }

      let bodyContent = JSON.stringify({
        curve: c1,
        time: c3,
      });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        // Format INPUT Curve valuation output
        for (let j = 0; j < disc?.length; j++) {
          s1.push({ tenor: disc[j].tenor, rate: dataout[j] });
        }
      } catch (error) {}

      // Compute Spread Valuation

      for (let i = 0; i < creditSpread?.length; i++) {
        c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
      }

      let bodyContent2 = JSON.stringify({
        curve: c2,
        time: c3,
      });

      try {
        let response2 = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent2,
            headers: headersList,
          }
        );

        let dataout2 = await response2.json();

        // Format Spread curve  valuation output
        for (let j = 0; j < disc?.length; j++) {
          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout2[j] + s1[j].rate + liquidity,
            rateOut: (+dataout2[j] + s1[j].rate + liquidity) * 100,
          });
        }
      } catch (error) {}
    }
  }

  //console.log("S22", s2);

  return {
    success: true,
    data: s2,
  };
};

export const computeGeneralEuropeanOption = async (
  data: Inputs,
  curve: any,
  volatility: any,
  dividend: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const volatility_curve = [];
  for (let i = 0; i < volatility.length; i++) {
    volatility_curve.push([volatility[i].tenor, +volatility[i].rate]);
  }

  const dividend_yield_curve = [];
  for (let i = 0; i < dividend.length; i++) {
    dividend_yield_curve.push([dividend[i].tenor, +dividend[i].rate]);
  }

  //console.log("forw", forw);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  const tmpp = data.spot ? +data.spot : 0;
  const ttt = data.strike ? +data.strike : 0;

  //if (tmpp) console.log("tmp", tmpp);

  let bodyContent = JSON.stringify({
    maturity_date: data.optionMaturityDate,
    valuation_date: data.valuationDate,
    spot: tmpp,
    strike: ttt,
    volatility_curve: volatility_curve,
    discount_curve: discount_curve,
    dividend_yield_curve: dividend_yield_curve,
    option_type: data.optionType,
    notional: data.notional,
    model: data.model,
  });

  /*   console.log("XX ", {
    maturity_date: data.optionMaturityDate,
    valuation_date: data.valuationDate,
    spot: tmpp,
    strike: ttt,
    volatility_curve: volatility_curve,
    discount_curve: discount_curve,
    dividend_yield_curve: dividend_yield_curve,
    option_type: data.optionType,
    notional: data.notional,
    model: data.model,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/european_option_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    console.log("response", response);

    let data = await response.json();

    console.log("DATA", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

// Compute Discounted Curve
export const computeAmeOptionDiscountCurve = async (
  data: Inputs2,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
  //  console.log("discdisc", disc);

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
    let c3 = [];

    // Compute ZC CURVE valuation
    for (let i = 0; i < zcrates?.length; i++) {
      c1.push([+zcrates[i].tenor, +zcrates[i].rate]);
    }

    for (let j = 0; j < disc?.length; j++) {
      c3.push(+disc[j].tenor);
    }

    let bodyContent = JSON.stringify({
      curve: c1,
      time: c3,
    });

    try {
      let response = await fetch(
        "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      let dataout = await response.json();

      // Format ZC Curve valuation output
      for (let j = 0; j < disc?.length; j++) {
        s1.push({ tenor: disc[j].tenor, rate: dataout[j] });
      }
    } catch (error) {}

    // Compute Spread Valuation

    for (let i = 0; i < creditSpread?.length; i++) {
      c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
    }

    let bodyContent2 = JSON.stringify({
      curve: c2,
      time: c3,
    });

    try {
      // console.log("ici");

      let response2 = await fetch(
        "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
        {
          method: "POST",
          body: bodyContent2,
          headers: headersList,
        }
      );

      let dataout2 = await response2.json();

      // Format Spread curve  valuation output
      for (let j = 0; j < disc?.length; j++) {
        s2.push({
          id: disc[j].id,
          tenor: disc[j].tenor,
          rate: +dataout2[j] + s1[j].rate + liquidity,
          rateOut: (+dataout2[j] + s1[j].rate + liquidity) * 100,
        });
      }
    } catch (error) {}
  } else {
    if (curveType == "yic") {
      let c1 = [];
      let c3 = [];

      // Compute Yield Curve
      for (let i = 0; i < yieldcurve?.length; i++) {
        c1.push([+yieldcurve[i].tenor, +yieldcurve[i].yield]);
      }

      for (let j = 0; j < disc?.length; j++) {
        c3.push(+disc[j].tenor);
      }

      let bodyContent = JSON.stringify({
        curve: c1,
        time: c3,
      });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        // console.log("dataout", dataout);

        // Format Yield Curve valuation output
        for (let j = 0; j < disc?.length; j++) {
          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout[j] + liquidity,
            rateOut: (+dataout[j] + liquidity) * 100,
          });
        }

        //  console.log("S2", s2);
      } catch (error) {}
    } else {
      // Compute Input curve valuation
      console.log("inputCurve", inputCurve);
      let c1 = [];
      let c2 = [];
      let c3 = [];

      // Compute INPUT CURVE valuation
      for (let i = 0; i < inputCurve?.length; i++) {
        c1.push([+inputCurve[i].tenor, +inputCurve[i].rate]);
      }

      for (let j = 0; j < disc?.length; j++) {
        c3.push(+disc[j].tenor);
      }

      let bodyContent = JSON.stringify({
        curve: c1,
        time: c3,
      });

      try {
        let response = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent,
            headers: headersList,
          }
        );

        let dataout = await response.json();

        // Format INPUT Curve valuation output
        for (let j = 0; j < disc?.length; j++) {
          s1.push({ tenor: disc[j].tenor, rate: dataout[j] });
        }
      } catch (error) {}

      // Compute Spread Valuation

      for (let i = 0; i < creditSpread?.length; i++) {
        c2.push([+creditSpread[i].tenor, +creditSpread[i].rate]);
      }

      let bodyContent2 = JSON.stringify({
        curve: c2,
        time: c3,
      });

      try {
        let response2 = await fetch(
          "http://213.165.83.130/metrics/interpolation_lineaire_multiple",
          {
            method: "POST",
            body: bodyContent2,
            headers: headersList,
          }
        );

        let dataout2 = await response2.json();

        // Format Spread curve  valuation output
        for (let j = 0; j < disc?.length; j++) {
          s2.push({
            id: disc[j].id,
            tenor: disc[j].tenor,
            rate: +dataout2[j] + s1[j].rate + liquidity,
            rateOut: (+dataout2[j] + s1[j].rate + liquidity) * 100,
          });
        }
      } catch (error) {}
    }
  }

  //console.log("S22", s2);

  return {
    success: true,
    data: s2,
  };
};

export const computeGeneralAmericanOption = async (
  data: Inputs2,
  curve: any,
  volatility: any,
  dividend: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const volatility_curve = [];
  for (let i = 0; i < volatility.length; i++) {
    volatility_curve.push([volatility[i].tenor, +volatility[i].rate]);
  }

  const dividend_yield_curve = [];
  for (let i = 0; i < dividend.length; i++) {
    dividend_yield_curve.push([dividend[i].tenor, +dividend[i].rate]);
  }

  //console.log("forw", forw);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  const tmpp = data.spot ? +data.spot : 0;
  const ttt = data.strike ? +data.strike : 0;

  //if (tmpp) console.log("tmp", tmpp);

  let bodyContent = JSON.stringify({
    maturity_date: data.optionMaturityDate,
    valuation_date: data.valuationDate,
    spot: tmpp,
    strike: ttt,
    volatility_curve: volatility_curve,
    discount_curve: discount_curve,
    dividend_yield_curve: dividend_yield_curve,
    option_type: data.optionType,
    notional: data.notional,
    model: data.model,
  });

  /*   console.log("XX ", {
    maturity_date: data.optionMaturityDate,
    valuation_date: data.valuationDate,
    spot: tmpp,
    strike: ttt,
    volatility_curve: volatility_curve,
    discount_curve: discount_curve,
    dividend_yield_curve: dividend_yield_curve,
    option_type: data.optionType,
    notional: data.notional,
    model: data.model,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/european_option_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    console.log("response", response);

    let data = await response.json();

    console.log("DATA", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};
