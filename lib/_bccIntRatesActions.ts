"use server";
import prisma from "./prisma";

// Get all users
export const getAllBCCIntRates = async () => {
  try {
    const bcc = await prisma.bCCIntRates.findMany({
      select: {
        date: true,
        rate: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: bcc,
    };
  } catch (error) {}
};
