"use server";

import { z } from "zod";
import { anaEvaSchema } from "./schemas";

type Inputs = z.infer<typeof anaEvaSchema>;
// Default probability
export const getDefaultProba = async (probabilite_defaut: any) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //console.log("ici", probabilite_defaut);

  let bodyContent = JSON.stringify({
    probabilite_defaut: probabilite_defaut ? +probabilite_defaut : 0,
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/analyse_probabilite_defaut",
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

// General recommandation
export const getGeneralReco = async (data: Inputs) => {
  //console.log("ici", data);

  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  //const result = anaEvaSchema.safeParse(data);

  //if (result.success) {
  const { issuePrice, obsPrice, duration, defProba, refinRisk } = data;

  //console.log("DAta", data);

  //const prix_obligation = "1.02";
  // const prix_moyen = "1.01";
  //console.log("ici", data);

  let bodyContent = JSON.stringify({
    prix_obligation: issuePrice ? +issuePrice / 100 : 0,
    prix_moyen: obsPrice ? +obsPrice / 100 : 0,
    duration: duration ? +duration : 0,
    probabilite_defaut: defProba ? +defProba / 100 : 0,
    risque_refinancement: refinRisk ? +refinRisk / 100 : 0,
    /*     prix_obligation: 1.02,
    prix_moyen: 1.01,
    duration: 6,
    probabilite_defaut: 0.08,
    risque_refinancement: 0.04, */
  });

  try {
    let response = await fetch(
      "http://213.165.83.130/analysis/analyse_obligation",
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
