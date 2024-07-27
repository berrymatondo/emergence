import prisma from "./prisma";

// Get all users
export const getAllFXR = async () => {
  try {
    const fxrs = await prisma.fXRates.findMany({
      select: {
        date: true,
        usdcdf: true,
        usdeur: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    //revalidatePath("/admin/users");

    return {
      success: true,
      data: fxrs,
    };
  } catch (error) {}
};
