"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { FinOptSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";
import { ratings } from "./enums";

type Inputs = z.infer<typeof FinOptSchema>;

export const getAllFinOpts = async () => {
  try {
    const overviews = await prisma.financingOptions.findMany({});

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

export const getFinOpts = async (code: string) => {
  try {
    const overviews = await prisma.financingOptions.findMany({
      where: {
        code: code,
      },
    });

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

export const getFinOptById = async (id: string) => {
  try {
    const overviews = await prisma.financingOptions.findUnique({
      where: {
        id: +id,
      },
    });

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

export const createFinOpt = async (
  data: Inputs,
  lastData: any,
  cma: number,
  bondPrice: number,
  duration: number,
  defProba: number,
  refinRisk: number
) => {
  // console.log("data", data);

  const result = FinOptSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const {
      code,
      valuationType,
      modality,
      couponRate,
      maturity,
      notional,
      recovering,
      rating,
      maturityDate,
      issueDate,
      couponBasis,
      couponFrequency,
      firstCouponDate,
      valuationDate,
      currency,
    } = result.data;

    try {
      //const session = await auth();

      //console.log("SESSION", session);
      //const userTmp: any = session?.user;
      //  console.log("modality", modality);

      user = await prisma.financingOptions.create({
        data: {
          valuationType: valuationType as string,
          couponBasis: couponBasis as string,
          code: code as string,
          modality: modality as string,
          couponRate: couponRate ? +couponRate : 0,
          maturity: maturity ? +maturity : 0,
          notional: notional ? +notional : 0,
          recovering: recovering ? +recovering : 0,
          rating: rating as string,
          maturityDate: maturityDate as string,
          issueDate: issueDate as string,
          couponFrequency: couponFrequency ? +couponFrequency : 1,
          firstCouponDate: firstCouponDate as string,
          valuationDate: valuationDate as string,
          currency: currency as string,
          cma: cma ? +cma : 0,
          bondPrice: bondPrice ? +bondPrice : 0,
          duration: duration ? +duration : 0,
          defProba: defProba ? +defProba : 0,
          refinRisk: refinRisk ? +refinRisk : 0,
        },
      });

      // console.log("OK user ", user);
      // revalidatePath("/anadette/anaopfin/1726025930243");
      revalidatePath(`/anadette/anaopfin/${code}`);

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  // Compute CashFlow
};

// Update
export const updateFinOpt = async (
  data: Inputs,
  cma: number,
  bondPrice: number,
  duration: number,
  defProba: number,
  refinRisk: number
) => {
  //console.log("DATA", data);

  const result = FinOptSchema.safeParse(data);

  if (result.success) {
    const {
      id,
      valuationType,
      modality,
      couponRate,
      maturity,
      issueDate,
      couponFrequency,
      couponBasis,
      maturityDate,
      notional,
      recovering,
      rating,
      valuationDate,
      currency,
    } = result.data;

    /*     console.log(
        "{email,name,isAdmin,  password, confirmPassword, celluleID }",
        username,
        email,
        role,
        password,
        confirmPassword
      ); */

    try {
      //const session = await auth();

      //console.log("SESSION", session);
      //const userTmp: any = session?.user;

      //console.log("modality", modality);

      const usr = await prisma.financingOptions.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          valuationType: valuationType as string,
          modality: modality as string,
          couponBasis: couponBasis as string,
          couponRate: couponRate ? +couponRate : 0,
          maturity: maturity ? +maturity : 0,
          notional: notional ? +notional : 0,
          recovering: recovering ? +recovering : 0,
          rating: rating as string,
          valuationDate: valuationDate as string,
          maturityDate: maturityDate as string,
          issueDate: issueDate as string,
          couponFrequency: couponFrequency ? +couponFrequency : 1,
          currency: currency as string,
          cma: cma ? +cma : 0,
          bondPrice: bondPrice ? +bondPrice : 0,
          duration: duration ? +duration : 0,
          defProba: defProba ? +defProba : 0,
          refinRisk: refinRisk ? +refinRisk : 0,
        },
      });

      // console.log("OK user ", user);
      // revalidatePath("/anadette/anaopfin/1726025930243");

      return { success: true, data: usr };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Delete
export const deleteFinOpts = async (id: string, code: string) => {
  let notEmpty = true;
  try {
    const overviews = await prisma.financingOptions.findMany({
      where: {
        code: code,
      },
    });

    const taille = overviews.length;
    //console.log("taille: ", taille);
    if (taille < 2) notEmpty = true;
  } catch (error) {}

  // Delete the current one
  try {
    const overviews = await prisma.financingOptions.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/anadette/anaopfin/${code}`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}

  // Empty the reserve if it the last opts we delete
  if (notEmpty) {
    try {
      const overviews = await prisma.reserve.deleteMany({
        where: {
          code: code,
        },
      });

      revalidatePath(`/anadette/anaopfin/${code}`);

      return {
        success: true,
        data: overviews,
      };
    } catch (error) {}
  }
};

export const computeCMA = async (
  maturity: any,
  cashflow: any,
  reserve: any,
  rateCurve: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("cashflow", cashflow);
  //console.log("reserve ", reserve);
  //console.log("rateCurve", rateCurve);

  let cash_flow = [];
  for (let i = 0; i < cashflow.length; i++) {
    cash_flow.push([+cashflow[i].date, +cashflow[i].gross]);
  }

  let reserves = [];
  for (let i = 0; i < reserve.length; i++) {
    reserves.push([+reserve[i].tenor, +reserve[i].value]);
  }

  //console.log("reserves", reserves);

  let rate_curve = [];
  for (let i = 0; i < rateCurve.length; i++) {
    rate_curve.push([rateCurve[i].tenor, +(rateCurve[i].rate / 100)]);
  }

  let bodyContent = JSON.stringify({
    maturite: +maturity,
    cash_flows: cash_flow,
    reserves: reserves,
    rate_curve: rate_curve,
  });

  //console.log("bodyContent ", bodyContent);

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/cout_moyen_annuel",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("LOG: response: ", response);
    //console.log("LOG: data: ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

// Compute Discounted Curve
export const computeDC = async (data: Inputs, disc: any, zcrates: any) => {
  //  console.log("discdisc", disc);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let s1 = [];
  let s2 = [];

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

  //console.log("S22", s2);

  return {
    success: true,
    data: s1,
  };
};

// General
export const computeGeneralValuation = async (data: Inputs, curve: any) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("curve", curve);
  let discount_curve = [];
  for (let i = 0; i < curve.length; i++) {
    discount_curve.push([curve[i].tenor, +(curve[i].rate / 100)]);
  }

  let bodyContent = JSON.stringify({
    maturity_date: data.maturityDate,
    payment_frequency: data.couponFrequency ? +data.couponFrequency : undefined,
    coupon_rate: data.couponRate ? +data.couponRate / 100 : undefined,
    first_coupon_date: data.firstCouponDate,
    valuation_date: data.valuationDate,
    discount_curve: discount_curve,
    day_count_convention: data.couponBasis,
    notional: data.notional,
  });

  //console.log("X", bodyContent);

  //BOND PRICE
  try {
    let response = await fetch(
      "http://213.165.83.130/valuation/straight_bond_valuation",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("Response ", response);
    // console.log("data ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

//Default Probability
export const computeDefProba = async (
  maturity: any,
  rating: any,
  recovering: any,
  cashflow: any,
  reserve: any,
  rateCurve: any,
  transMat: any,
  defMat: any,
  impMat: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("impMat ", impMat?.data);
  //console.log("reserve ", reserve);
  //console.log("rateCurve", rateCurve);

  let cash_flow = [];
  for (let i = 0; i < cashflow.length; i++) {
    cash_flow.push([+cashflow[i].date, +cashflow[i].gross]);
  }

  let reserves = [];
  for (let i = 0; i < reserve.length; i++) {
    reserves.push([+reserve[i].tenor, +reserve[i].value]);
  }

  //console.log("reserves", reserves);

  let rate_curve = [];
  for (let i = 0; i < rateCurve.length; i++) {
    rate_curve.push([rateCurve[i].tenor, +(rateCurve[i].rate / 100)]);
  }

  let trans = [];
  let trans2 = [];
  for (let i = 0; i < transMat?.data.length; i++) {
    //console.log("x", Object.values(transMat?.data[i]));
    /*     for (let j = 2; j < Object.values(transMat?.data[i]).length; j++) {
     */ trans.push([
      Object.values(transMat?.data[i])[3],
      Object.values(transMat?.data[i])[4],
      Object.values(transMat?.data[i])[5],
      Object.values(transMat?.data[i])[6],
      Object.values(transMat?.data[i])[7],
      Object.values(transMat?.data[i])[8],
      Object.values(transMat?.data[i])[9],
      Object.values(transMat?.data[i])[10],
      Object.values(transMat?.data[i])[11],
    ]);
    // }

    /*     const tempo = [];
    console.log("Size", Object.values(transMat?.data[i]));

    for (let j = 2; j < 10; j++) {
      tempo.push(Object.values(transMat?.data[i])[j]);
      console.log("x: ", Object.values(transMat?.data[i])[j]);
    }
    trans2.push(tempo);
 */
    // trans.push([transMat[i].tenor, +(rateCurve[i].rate / 100)]);
  }

  //console.log("trans2", trans2);

  let def = [];
  for (let i = 0; i < defMat?.data.length; i++) {
    // console.log("x", Object.values(defMat?.data[i]));
    /*     for (let j = 2; j < Object.values(transMat?.data[i]).length; j++) {
     */ def.push([
      Object.values(defMat?.data[i])[3],
      Object.values(defMat?.data[i])[4],
      Object.values(defMat?.data[i])[5],
      Object.values(defMat?.data[i])[6],
      Object.values(defMat?.data[i])[7],
      Object.values(defMat?.data[i])[8],
      Object.values(defMat?.data[i])[9],
      Object.values(defMat?.data[i])[10],
      Object.values(defMat?.data[i])[11],
      Object.values(defMat?.data[i])[12],
    ]);
    // }

    // trans.push([transMat[i].tenor, +(rateCurve[i].rate / 100)]);
  }
  console.log("DEF ", def);

  let imp = [];
  for (let i = 0; i < impMat?.data.length; i++) {
    //console.log("x", Object.values(impMat?.data[i]));
    /*     for (let j = 2; j < Object.values(transMat?.data[i]).length; j++) {
     */ imp.push([
      Object.values(impMat?.data[i])[3],
      Object.values(impMat?.data[i])[4],
      Object.values(impMat?.data[i])[5],
      Object.values(impMat?.data[i])[6],
      Object.values(impMat?.data[i])[7],
      Object.values(impMat?.data[i])[8],
      Object.values(impMat?.data[i])[9],
      Object.values(impMat?.data[i])[10],
      Object.values(impMat?.data[i])[11],
    ]);
    // }

    // trans.push([transMat[i].tenor, +(rateCurve[i].rate / 100)]);
  }

  //console.log("trans ", trans);
  //console.log("cash_flow ", reserves);
  const ratingLabel = ratings
    .find((va: any) => va.id == (rating ? +rating : 1))
    ?.label.toString();

  //console.log("recovering", +recovering / 100);
  //console.log("ratingLabel", ratingLabel);

  let bodyContent = JSON.stringify({
    maturite: maturity ? +maturity : 0,
    rating: ratingLabel,
    seniorite: "Senior",
    mappingCashFlow: cash_flow,
    reserveAnnuelle: reserves,
    matriceTransition: trans,
    /*     matriceTransition: [
      [95.2, 4.8, 0, 0, 0, 0, 0, 0, 0],
      [0.0, 95.2, 4.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 1.4, 94.6, 1.4, 0.0, 0.0, 0.0, 0.0, 2.7],
      [0.0, 0.0, 1.7, 90.4, 2.5, 0.2, 0.0, 0.0, 5.2],
      [0.0, 0.0, 0.0, 2.5, 86.6, 2.0, 0.3, 0.0, 8.7],
      [0.0, 0.0, 0.0, 0.0, 3.7, 80.1, 2.6, 0.2, 13.5],
      [0.0, 0.0, 0.0, 0.0, 0.0, 8.1, 61.3, 16.1, 14.5],
    ], */
    matriceDefaut: def,
    /*       matriceDefaut: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.2, 0.2, 0.3],
      [0.1, 0.5, 0.9, 1.4, 1.8, 2.2, 2.4, 2.6, 2.8, 2.9],
      [0.6, 1.6, 2.8, 3.9, 4.9, 5.6, 6.3, 6.7, 7.1, 7.4],
      [3.2, 6.6, 9.2, 11.3, 12.7, 13.8, 14.8, 15.7, 16.5, 17.3],
      [18.7, 24.0, 26.7, 27.8, 28.8, 29.7, 30.4, 31.2, 31.8, 32.3],
    ], */
    tauxZeroCoupon: rate_curve,
    tauxRecouvrement: recovering ? +recovering / 100 : 0,
    discountCurve: rate_curve,
    matriceImplicite: imp,
    /*     matriceImplicite: [
      [0.11, 0.61, 1.68, 2.55, 3.15, 13.07, 16.23, 100.0, 21.23],
      [0.06, 0.51, 1.73, 2.59, 3.49, 13.43, 16.92, 100.0, 21.92],
      [0.04, 0.44, 1.9, 2.41, 8.48, 13.43, 21.91, 100.0, 26.91],
      [0.05, 0.47, 2.22, 2.77, 9.56, 14.03, 23.59, 100.0, 28.59],
      [0.04, 0.56, 2.51, 2.94, 11.48, 17.03, 28.51, 100.0, 33.51],
      [0.05, 0.69, 3.08, 3.69, 11.55, 17.68, 29.23, 100.0, 34.23],
    ], */

    /*   ratings
        .find((va: any) => va.id == (values?.rating ? +values?.rating : 1))
        ?.label.toString()
         */
    /*     maturite: +maturity,
    cash_flows: cash_flow,
    reserves: reserves,
    rate_curve: rate_curve, */
  });

  console.log("bodyContent ", {
    maturite: maturity ? +maturity : 0,
    rating: ratingLabel,
    seniorite: "Senior",
    mappingCashFlow: cash_flow,
    reserveAnnuelle: reserves,
    matriceTransition: trans,
    matriceDefaut: def,

    tauxZeroCoupon: rate_curve,
    tauxRecouvrement: recovering ? +recovering / 100 : 0,
    discountCurve: rate_curve,
    matriceImplicite: imp,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/probabilite_defaut",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    console.log("ic i");

    let data = await response.json();
    console.log("sss");

    console.log("LOG: response:", response);
    console.log("LOG: data: ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};

//Refin Risk
export const computeRefRisk = async (
  maturity: any,
  cashflow: any,
  reserve: any,
  rateCurve: any
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("cashflow", cashflow);
  //console.log("reserve ", reserve);
  //console.log("rateCurve", rateCurve);

  let cash_flow = [];
  for (let i = 0; i < cashflow.length; i++) {
    cash_flow.push([+cashflow[i].date, +cashflow[i].gross]);
  }

  let reserves = [];
  for (let i = 0; i < reserve.length; i++) {
    reserves.push([+reserve[i].tenor, +reserve[i].value]);
  }

  //console.log("reserves", reserves);

  let rate_curve = [];
  for (let i = 0; i < rateCurve.length; i++) {
    rate_curve.push([rateCurve[i].tenor, +(rateCurve[i].rate / 100)]);
  }

  let bodyContent = JSON.stringify({
    maturite: +maturity,
    cash_flows: cash_flow,
    reserves: reserves,
    rate_curve: rate_curve,
  });

  //console.log("bodyContent ", bodyContent);

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/risque_refinancement",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("LOG: response: ", response);
    //console.log("LOG: data: ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};
