"use server";
import prisma from "./prisma";

// Get all users
export const getAllOverview = async () => {
  try {
    const overviews = await prisma.overview.findMany();

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};
