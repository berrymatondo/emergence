"use server";

import { z } from "zod";
import { AnaCroissancechema } from "./schemas";

type Inputs = z.infer<typeof AnaCroissancechema>;

// General recommandation
export const computeCroissance = async (
  data: Inputs,
  parCal: number,
  croissanceDes: number
) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {

  const {
    tInternational,
    creditSpread,
    tInterieur,
    infNationale,
    infMondiale,
    soldePrim,
    exportations,
    importations,
    rendement,
    invest,
    debtExterne,
    debtInterne,
    variation,
  } = data;

  let bodyContent = JSON.stringify({
    tauxInteretUSD: tInternational ? +tInternational / 100 : 0,
    spreadInteret: creditSpread ? +creditSpread / 100 : 0,
    tauxInteretLocal: tInterieur ? +tInterieur / 100 : 0,
    tauxInflationNational: infNationale ? +infNationale / 100 : 0,
    tauxInflationMondial: infMondiale ? +infMondiale / 100 : 0,
    SoldePrimaire: soldePrim ? +soldePrim / 100 : 0,
    exportation: exportations ? +exportations / 100 : 0,
    importation: importations ? +importations / 100 : 0,
    rendementInvestissement: rendement ? +rendement / 100 : 0,
    investissement: invest ? +invest / 100 : 0,
    detteExternePIB: debtExterne ? +debtExterne / 100 : 0,
    detteInternePIB: debtInterne ? +debtInterne / 100 : 0,
    variationTauxChange: variation ? +variation / 100 : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/estimation_de_croissance",
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

export const computeRecomCroissance = async (
  data: Inputs,
  croissance: number
) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {
  const {
    tInternational,
    creditSpread,
    tInterieur,
    infNationale,
    infMondiale,
    soldePrim,
    exportations,
    importations,
    rendement,
    invest,
    debtExterne,
    debtInterne,
    variation,
  } = data;

  let bodyContent = JSON.stringify({
    croissance_pib: croissance ? +croissance : 0,
    taux_interet_usd: tInternational ? +tInternational / 100 : 0,
    spread_interet: creditSpread ? +creditSpread / 100 : 0,
    taux_interet_local: tInterieur ? +tInterieur / 100 : 0,
    taux_inflation_national: infNationale ? +infNationale / 100 : 0,
    taux_inflation_mondial: infMondiale ? +infMondiale / 100 : 0,
    solde_primaire: soldePrim ? +soldePrim / 100 : 0,
    exportation: exportations ? +exportations / 100 : 0,
    importation: importations ? +importations / 100 : 0,
    rendement_investissement: rendement ? +rendement / 100 : 0,
    investissement: invest ? +invest / 100 : 0,
    dette_externe_pib: debtExterne ? +debtExterne / 100 : 0,
    dette_interne_pib: debtInterne ? +debtInterne / 100 : 0,
    variation_taux_change: variation ? +variation / 100 : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/recommandation_croissance",
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
  // }
};

export const computeRecomDetteCroissance = async (
  data: Inputs,
  croissance: number
) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {
  const {
    tInternational,
    creditSpread,
    tInterieur,
    infNationale,
    infMondiale,
    soldePrim,
    exportations,
    importations,
    rendement,
    invest,
    debtExterne,
    debtInterne,
    variation,
  } = data;

  let bodyContent = JSON.stringify({
    croissance_pib: croissance ? +croissance : 0,
    taux_interet_usd: tInternational ? +tInternational / 100 : 0,
    spread_interet: creditSpread ? +creditSpread / 100 : 0,
    taux_interet_local: tInterieur ? +tInterieur / 100 : 0,
    taux_inflation_national: infNationale ? +infNationale / 100 : 0,
    taux_inflation_mondial: infMondiale ? +infMondiale / 100 : 0,
    solde_primaire: soldePrim ? +soldePrim / 100 : 0,
    exportation: exportations ? +exportations / 100 : 0,
    importation: importations ? +importations / 100 : 0,
    rendement_investissement: rendement ? +rendement / 100 : 0,
    investissement: invest ? +invest / 100 : 0,
    dette_externe_pib: debtExterne ? +debtExterne / 100 : 0,
    dette_interne_pib: debtInterne ? +debtInterne / 100 : 0,
    variation_taux_change: variation ? +variation / 100 : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/recommandations_gestion_dette",
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
  // }
};

export const computeTxInternational = async (
  data: Inputs,
  croissanceDes: number
) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {
  const {
    tInternational,
    creditSpread,
    tInterieur,
    infNationale,
    infMondiale,
    soldePrim,
    exportations,
    importations,
    rendement,
    invest,
    debtExterne,
    debtInterne,
    variation,
  } = data;

  let bodyContent = JSON.stringify({
    croissancePIBcible: croissanceDes ? +croissanceDes : 0,
    spreadInteret: creditSpread ? +creditSpread / 100 : 0,
    tauxInteretLocal: tInterieur ? +tInterieur / 100 : 0,
    tauxInflationNational: infNationale ? +infNationale / 100 : 0,
    tauxInflationMondial: infMondiale ? +infMondiale / 100 : 0,
    SoldePrimaire: soldePrim ? +soldePrim / 100 : 0,
    exportation: exportations ? +exportations / 100 : 0,
    importation: importations ? +importations / 100 : 0,
    rendementInvestissement: rendement ? +rendement / 100 : 0,
    investissement: invest ? +invest / 100 : 0,
    detteExternePIB: debtExterne ? +debtExterne / 100 : 0,
    detteInternePIB: debtInterne ? +debtInterne / 100 : 0,
    variationTauxChange: variation ? +variation / 100 : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/estimation_de_taux_dinteret_international",
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
  // }
};

// computeCreditSpread
export const computeCreditSpread = async (
  data: Inputs,
  croissanceDes: number
) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {
  const {
    tInternational,
    creditSpread,
    tInterieur,
    infNationale,
    infMondiale,
    soldePrim,
    exportations,
    importations,
    rendement,
    invest,
    debtExterne,
    debtInterne,
    variation,
  } = data;

  let bodyContent = JSON.stringify({
    targetCroissancePIB: croissanceDes ? +croissanceDes : 0,
    tauxInteretUSD: tInternational ? +tInternational / 100 : 0,
    tauxInteretLocal: tInterieur ? +tInterieur / 100 : 0,
    tauxInflationNational: infNationale ? +infNationale / 100 : 0,
    tauxInflationMondial: infMondiale ? +infMondiale / 100 : 0,
    SoldePrimaire: soldePrim ? +soldePrim / 100 : 0,
    exportation: exportations ? +exportations / 100 : 0,
    importation: importations ? +importations / 100 : 0,
    rendementInvestissement: rendement ? +rendement / 100 : 0,
    investissement: invest ? +invest / 100 : 0,
    detteExternePIB: debtExterne ? +debtExterne / 100 : 0,
    detteInternePIB: debtInterne ? +debtInterne / 100 : 0,
    variationTauxChange: variation ? +variation / 100 : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/estimation_de_spread_de_credit",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log("LOG: response: ", response);
    // console.log("LOG: data: ", data);

    return {
      success: true,
      data: data,
    };
  } catch (error) {}
  // }
};
