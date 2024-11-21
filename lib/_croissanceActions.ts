"use server";
import prisma from "./prisma";
import { z } from "zod";
import { croissanceSchema } from "./schemas";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof croissanceSchema>;

export const getAllCroissances = async () => {
  try {
    const croissances = await prisma.croissance.findMany({
      orderBy: {
        year: "asc",
      },
    });

    return {
      success: true,
      data: croissances,
    };
  } catch (error) {}
};

// Add croissance
export const createCroissance = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = croissanceSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const {
      scenario,
      type,
      subType,
      year,
      croissance,
      debtExtPIB,
      txInternational,
      creditSpread,
      txInterieur,
      infNat,
      infMon,
      soldePrim,
      exportation,
      inportation,
      rendement,
      invest,
      debtIntPIB,
      variantion,
    } = result.data;

    try {
      user = await prisma.croissance.create({
        data: {
          scenario: scenario ? +scenario : 1,
          type: type as string,
          subType: subType as string,
          year: year ? +year : 0,
          croissance: croissance ? +croissance : 0,
          debtExtPIB: debtExtPIB ? +debtExtPIB : 0,
          txInternational: txInternational ? +txInternational : 0,
          creditSpread: creditSpread ? +creditSpread : 0,
          txInterieur: txInterieur ? +txInterieur : 0,
          infNat: infNat ? +infNat : 0,
          infMon: infMon ? +infMon : 0,
          soldePrim: soldePrim ? +soldePrim : 0,
          exportation: exportation ? +exportation : 0,
          inportation: inportation ? +inportation : 0,
          rendement: rendement ? +rendement : 0,
          invest: invest ? +invest : 0,
          debtIntPIB: debtIntPIB ? +debtIntPIB : 0,
          variantion: variantion ? +variantion : 0,
        },
      });

      revalidatePath(`/anadette/anascen`);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Update croissance
export const updateCroissance = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = croissanceSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const {
      id,
      scenario,
      type,
      subType,
      year,
      croissance,
      debtExtPIB,
      txInternational,
      creditSpread,
      txInterieur,
      infNat,
      infMon,
      soldePrim,
      exportation,
      inportation,
      rendement,
      invest,
      debtIntPIB,
      variantion,
    } = result.data;

    try {
      user = await prisma.croissance.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          scenario: scenario ? +scenario : 1,
          type: type as string,
          subType: subType as string,
          year: year ? +year : 0,
          croissance: croissance ? +croissance : 0,
          debtExtPIB: debtExtPIB ? +debtExtPIB : 0,
          txInternational: txInternational ? +txInternational : 0,
          creditSpread: creditSpread ? +creditSpread : 0,
          txInterieur: txInterieur ? +txInterieur : 0,
          infNat: infNat ? +infNat : 0,
          infMon: infMon ? +infMon : 0,
          soldePrim: soldePrim ? +soldePrim : 0,
          exportation: exportation ? +exportation : 0,
          inportation: inportation ? +inportation : 0,
          rendement: rendement ? +rendement : 0,
          invest: invest ? +invest : 0,
          debtIntPIB: debtIntPIB ? +debtIntPIB : 0,
          variantion: variantion ? +variantion : 0,
        },
      });

      revalidatePath(`/anadette/anascen`);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Delete croissance
export const deleteCroissance = async (id: string) => {
  try {
    const overviews = await prisma.croissance.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/anadette/anascen`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

// Compute external debt
export const computeDebt = async (data: any) => {
  //console.log("reserve", data);

  const {
    taux_interet,
    taux_interet_ref,
    spread_souverain,
    spread_ref,
    taux_change,
    taux_change_ref,
    inflation,
    inflation_ref,
    performance_matieres,
  } = data;

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    /*       taux_interet: data.taux_interet ? +data.taux_interet : 0,
      taux_interet_ref: data.taux_interet_ref ? +data.taux_interet_ref : 0,
      spread_souverain: data.spread_souverain ? +data.spread_souverain : 0,
      spread_ref: data.spread_ref ? +data.spread_ref : 0,
      taux_change: data.taux_change ? +data.taux_change : 0,
      taux_change_ref: data.taux_change_ref ? +data.taux_change_ref : 0,
      inflation: data.inflation ? +data.inflation : 0,
      inflation_ref: data.inflation_ref ? +data.inflation_ref : 0,
      performance_matieres: data.performance_matieres
        ? +data.performance_matieres
        : 0, */
    targetCroissancePIB: 0.062516,
    tauxInteretUSD: 0.055,
    spreadInteret: 0.04,
    tauxInteretLocal: 0.25,
    tauxInflationNational: 0.23,
    tauxInflationMondial: 0.068,
    SoldePrimaire: -0.021,
    exportation: 0.24,
    importation: 0.18,
    rendementInvestissement: 0.01,
    investissement: 0.108,
    detteInternePIB: 0.02,
    variationTauxChange: 0.22,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/estimation_du_ratio_dette_externe_PIB",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    console.log("response", response);

    let data = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
};
