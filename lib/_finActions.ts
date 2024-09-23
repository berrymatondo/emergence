"use server";
import { revalidatePath } from "next/cache";
import prisma from "./prisma";
import { FinOptSchema } from "./schemas";
import bcrypt from "bcrypt";
import { z } from "zod";

type Inputs = z.infer<typeof FinOptSchema>;

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
