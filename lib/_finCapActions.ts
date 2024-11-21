"use server";
import prisma from "./prisma";
import { z } from "zod";
import { finCapSchema } from "./schemas";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof finCapSchema>;

// compute Financial capacity
export const computeFinCap = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = finCapSchema.safeParse(data);

  if (result.success) {
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
    } = result.data;

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      taux_interet: data.taux_interet ? +data.taux_interet : 0,
      taux_interet_ref: data.taux_interet_ref ? +data.taux_interet_ref : 0,
      spread_souverain: data.spread_souverain ? +data.spread_souverain : 0,
      spread_ref: data.spread_ref ? +data.spread_ref : 0,
      taux_change: data.taux_change ? +data.taux_change : 0,
      taux_change_ref: data.taux_change_ref ? +data.taux_change_ref : 0,
      inflation: data.inflation ? +data.inflation : 0,
      inflation_ref: data.inflation_ref ? +data.inflation_ref : 0,
      performance_matieres: data.performance_matieres
        ? +data.performance_matieres
        : 0,
    });

    console.log();

    try {
      let response = await fetch(
        "http://213.165.83.130/analysis/capacite_financement_analyse",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      // console.log("response", response);

      let data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (error) {}
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// compute Fait historique
export const computeFaitHisto = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = finCapSchema.safeParse(data);

  if (result.success) {
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
    } = result.data;

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      taux_interet: data.taux_interet ? +data.taux_interet : 0,
      taux_interet_ref: data.taux_interet_ref ? +data.taux_interet_ref : 0,
      spread_souverain: data.spread_souverain ? +data.spread_souverain : 0,
      spread_ref: data.spread_ref ? +data.spread_ref : 0,
      taux_change: data.taux_change ? +data.taux_change : 0,
      taux_change_ref: data.taux_change_ref ? +data.taux_change_ref : 0,
      inflation: data.inflation ? +data.inflation : 0,
      inflation_ref: data.inflation_ref ? +data.inflation_ref : 0,
      performance_matieres: data.performance_matieres
        ? +data.performance_matieres
        : 0,
    });

    console.log();

    try {
      let response = await fetch(
        "http://213.165.83.130/analysis/generer_fait_historique",
        {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        }
      );

      //console.log("response", response);

      let data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (error) {}
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};
