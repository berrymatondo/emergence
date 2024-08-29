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
  try {
    const zcr = await prisma.forwardRate.findMany({
      where: {
        AND: [{ type: "L" }, { currencyId: id }, { label: label }],
      },
    });

    return {
      success: true,
      data: zcr.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};

// Get all Step up rates
export const getAllStepRates = async () => {
  try {
    const ycs = await prisma.stepUpRate.findMany({});

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};

// Get amortization commo schedule
export const getAllAmoCommoSchedule = async () => {
  try {
    const ycs = await prisma.amortizationCommoSchedule.findMany({});

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.date - b.date),
    };
  } catch (error) {}
};
// Get Commo forward rates
export const getAllCommoForwardRates = async () => {
  try {
    const ycs = await prisma.commoForwardRate.findMany({});

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};

// Get Forward by commo
export const getForwardByCommo = async (id: number) => {
  try {
    const ycs = await prisma.commoForwardRate.findMany({
      where: {
        commoId: id,
      },
    });

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};

// Get all commos
export const getAllCommos = async () => {
  try {
    const ycs = await prisma.commo.findMany({});

    return {
      success: true,
      data: ycs.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};

// Get specific commo
export const getCommo = async (id: number) => {
  try {
    const ycs = await prisma.commo.findUnique({
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
