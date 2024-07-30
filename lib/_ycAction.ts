"use server";
import prisma from "./prisma";

// Get all users
export const getAllYC = async () => {
  try {
    const ycs = await prisma.yieldCurve.findMany({
      where: {
        AND: [{ type: "L" }, { country: true }],
      },
    });

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
};
