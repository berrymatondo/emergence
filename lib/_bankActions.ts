"use server";

import { z } from "zod";
import {
  CommoPriceSchema,
  InterestRateSchema,
  CrossPriceSchema,
} from "./schemas";
// Get all users
type Inputs = z.infer<typeof InterestRateSchema>;
type Inputs2 = z.infer<typeof CommoPriceSchema>;
type Inputs3 = z.infer<typeof CrossPriceSchema>;

// Compute Discounted Curve
export const computeInterestDiscountCurve = async (
  data: Inputs,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
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
      // console.log("inputCurve", inputCurve);
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

export const computeInterestRateSwap = async (
  data: Inputs,
  curve: any,
  floatingRates: any,
  indexesRates: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let floating_rate_index = [];
  for (let i = 0; i < indexesRates.length; i++) {
    floating_rate_index.push([
      indexesRates[i].tenor,
      +indexesRates[i].rate / 100,
    ]);
  }

  let floating_rate_curve = [];
  for (let i = 0; i < floatingRates.length; i++) {
    floating_rate_curve.push([
      floatingRates[i].tenor,
      +floatingRates[i].rate / 100,
    ]);
  }

  //console.log("curve", curve);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  //MAPPING
  const suf = data.fixedFrequency ? data.fixedFrequency.split(" ")[1] : "month";

  const tt = data.fixedFrequency ? data.fixedFrequency.split(" ")[0] : 1;
  const freq = suf.includes("month") ? +tt / 12 : tt;

  /*   mois	base annuelle 	label
1	0.0833	1 month
2	0.1667	2 month
3	0.2500	3 month
4	0.3333	4 month
5	0.4167	5 month
6	0.5000	6 month
7	0.5833	7 month
8	0.6667	8 month
9	0.7500	9 month
10	0.8333	10 month
11	0.9167	11 month
12	1.0000	1year
24	2.0000	2 years */

  let bodyContent = JSON.stringify({
    start_date: data.startDate,
    end_date: data.endDate,
    fixed_rate: data.fixedRate ? +data.fixedRate / 100 : undefined,
    floating_rate_index: floating_rate_index,
    payment_frequency: +freq,
    notional: data.swapNotional ? +data.swapNotional : 0,
    discount_curve: discount_curve,
    floating_rate_curve: floating_rate_curve,
  });

  /*   console.log("X", {
    start_date: data.startDate,
    end_date: data.endDate,
    fixed_rate: data.fixedRate ? +data.fixedRate / 100 : undefined,
    floating_rate_index: floating_rate_index,
    payment_frequency: +freq,
    notional: data.swapNotional ? +data.swapNotional : 0,
    discount_curve: discount_curve,
    floating_rate_curve: floating_rate_curve,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/interest_rate_swap",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();

    // console.log("DATA", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

// Commo prices
export const computeCommoDiscountCurve = async (
  data: Inputs2,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
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
      // console.log("inputCurve", inputCurve);
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

export const computeCommoPriceSwap = async (
  data: Inputs2,
  curve: any,
  floatingRates: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  /*   let floating_rate_index = [];
  for (let i = 0; i < indexesRates.length; i++) {
    floating_rate_index.push([
      indexesRates[i].tenor,
      +indexesRates[i].rate / 100,
    ]);
  }
 */
  let floating_rate_curve = [];
  for (let i = 0; i < floatingRates.length; i++) {
    floating_rate_curve.push([floatingRates[i].tenor, +floatingRates[i].rate]);
  }

  //console.log("curve", curve);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  //MAPPING
  const suf = data.fixedFrequency ? data.fixedFrequency.split(" ")[1] : "month";

  const tt = data.fixedFrequency ? data.fixedFrequency.split(" ")[0] : 1;
  const freq = suf.includes("month") ? +tt / 12 : tt;

  /*   mois	base annuelle 	label
1	0.0833	1 month
2	0.1667	2 month
3	0.2500	3 month
4	0.3333	4 month
5	0.4167	5 month
6	0.5000	6 month
7	0.5833	7 month
8	0.6667	8 month
9	0.7500	9 month
10	0.8333	10 month
11	0.9167	11 month
12	1.0000	1year
24	2.0000	2 years */

  let bodyContent = JSON.stringify({
    start_date: data.startDate,
    end_date: data.endDate,
    fixed_price: data.fixedPrice ? +data.fixedPrice : 0,
    //floating_price_index: floating_rate_index,
    payment_frequency: +freq,
    notional: data.swapNotional ? +data.swapNotional : 0,
    discount_curve: discount_curve,
    floating_price_curve: floating_rate_curve,
  });

  /*   console.log("X ", {
    start_date: data.startDate,
    end_date: data.endDate,
    fixed_price: data.fixedPrice ? +data.fixedPrice : 0,
    payment_frequency: +freq,
    notional: data.swapNotional ? +data.swapNotional : 0,
    discount_curve: discount_curve,
    floating_price_curve: floating_rate_curve,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/commodity_swap",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();

    // console.log("DATA", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

// CROSS
export const computeCrossDiscountCurve = async (
  data: Inputs3,
  disc: any,
  yieldcurve: any,
  zcrates: any,
  inputCurve: any,
  creditSpread: any,
  curveType: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let s1 = [];
  let s2 = [];

  let liquidity = data.liquidityPremium ? +data.liquidityPremium : 0;
  if (curveType.includes("2"))
    liquidity = data.liquidityPremium2 ? +data.liquidityPremium2 : 0;
  let val2 = 0;
  let val3 = 0;

  if (curveType == "zcc" || curveType == "zcc2") {
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
    if (curveType == "yic" || curveType == "yic2") {
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
      // console.log("inputCurve", inputCurve);
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

export const computeCrossCurrencySwap = async (
  data: Inputs3,
  curve1: any,
  curve2: any,
  floatingRates2: any
) => {
  //console.log("datax", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let discountCurve1 = [];
  for (let i = 0; i < curve1.length; i++) {
    discountCurve1.push([curve1[i].tenor, +(curve1[i].rate / 100)]);
  }

  let discountCurve2 = [];
  for (let i = 0; i < curve2.length; i++) {
    discountCurve2.push([curve2[i].tenor, +(curve2[i].rate / 100)]);
  }

  let floatingRateIndex2 = [];
  for (let i = 0; i < floatingRates2.length; i++) {
    floatingRateIndex2.push([
      floatingRates2[i].tenor,
      +(floatingRates2[i].rate / 100),
    ]);
  }

  const suf = data.fixedFrequency ? data.fixedFrequency.split(" ")[1] : "month";

  const tt = data.fixedFrequency ? data.fixedFrequency.split(" ")[0] : 1;
  const freq = suf.includes("month") ? +tt / 12 : tt;

  let bodyContent = JSON.stringify({
    start_date: data.startDate,
    end_date: data.endDate,

    notional_1: data.swapNotional1 ? +data.swapNotional1 : 0,
    fixed_rate_1: data.fixedRate1 ? +data.fixedRate1 / 100 : undefined,
    currency_1_discount_curve: discountCurve1,

    notional_2: data.swapNotional2 ? +data.swapNotional2 : 0,
    floating_rate_index_2: floatingRateIndex2,
    currency_2_discount_curve: discountCurve2,

    exchange_rate: data.exchangeRate ? +data.exchangeRate : 0,
    payment_frequency: +freq,
  });

  /*   console.log("Xcx ", {
    start_date: data.startDate,
    end_date: data.endDate,

    notional_1: data.swapNotional1 ? +data.swapNotional1 : 0,
    fixed_rate_1: data.fixedRate1 ? +data.fixedRate1 / 100 : undefined,
    currency_1_discount_curve: discountCurve1,

    notional_2: data.swapNotional2 ? +data.swapNotional2 : 0,
    floating_rate_index_2: floatingRateIndex2,
    currency_2_discount_curve: discountCurve2,

    exchange_rate: data.exchangeRate ? +data.exchangeRate : 0,
    payment_frequency: +freq,
  }); */

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/cross_currency_swap",
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
