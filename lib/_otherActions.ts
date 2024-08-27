"use server";
import prisma from "./prisma";

// Get all countries
export const getAllCountries = async () => {
  try {
    const ycs = await prisma.country.findMany({});

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
};

// Get all currencies
export const getAllCurrencies = async () => {
  try {
    const ycs = await prisma.currency.findMany({});

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
};

// Get specific currency
export const getCurrency = async (id: number) => {
  try {
    const ycs = await prisma.currency.findUnique({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
};

// Get amortization schedule
export const getAllAmoSchedule = async () => {
  try {
    const ycs = await prisma.amortizationSchedule.findMany({});

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.date - b.date),
    };
  } catch (error) {}
};

// Get forward rates
export const getAllForwardRates = async (id: number, label: string) => {
  // console.log("country", country);
  // console.log("id", id);

  try {
    const zcr = await prisma.forwardRate.findMany({
      where: {
        AND: [{ type: "L" }, { currencyId: id }, { label: label }],
      },
    });

    //revalidatePath("/admin/users");

    /*     console.log(
      "ycs: ",
      zcr.sort((a: any, b: any) => a.tenor - b.tenor)
    ); */

    return {
      success: true,
      data: zcr.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};
