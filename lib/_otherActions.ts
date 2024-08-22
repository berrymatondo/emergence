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
