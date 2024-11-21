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
