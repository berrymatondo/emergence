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
