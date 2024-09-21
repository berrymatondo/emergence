"use server";
import prisma from "./prisma";
import { z } from "zod";
import { ReserveSchema } from "./schemas";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof ReserveSchema>;

export const getReserveByCode = async (code: string) => {
  try {
    const reserves = await prisma.reserve.findMany({
      where: {
        code: code,
      },
    });

    return {
      success: true,
      data: reserves,
    };
  } catch (error) {}
};
//getLastReserve

// Add reserve Input
export const createReserve = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = ReserveSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { tenor, value, code } = result.data;

    try {
      user = await prisma.reserve.create({
        data: {
          tenor: tenor ? +tenor : 0,
          value: value ? +value : 0,
          code: code as string,
        },
      });

      revalidatePath(`/anadette/anaopfin/${code}`);
      revalidatePath(`/anadette/anaopfin/${code}/new`);

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

// Update Input
export const updateReserve = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = ReserveSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { id, tenor, value, code } = result.data;

    try {
      user = await prisma.reserve.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          tenor: tenor ? +tenor : 0,
          value: value ? +value : 0,
          // code: code as string,
        },
      });

      revalidatePath(`/anadette/anaopfin/${code}`);
      revalidatePath(`/anadette/anaopfin/${code}/update`);

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

// Delete reserve
// Delete
export const deleteReserve = async (id: string, code: string) => {
  try {
    const overviews = await prisma.reserve.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/anadette/anaopfin/${code}`);
    revalidatePath(`/anadette/anaopfin/${code}/new`);
    revalidatePath(`/anadette/anaopfin/${code}/update`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

// AutoFill
// Add reserve Input
export const autoFillReserve = async (code: string, value: string) => {
  //console.log("reserve", data);

  const initialDisc = [
    { tenor: 0, value: value ? +value : 0, code: code as string },
    { tenor: 0.5, value: value ? +value : 0, code: code as string },
    { tenor: 1, value: value ? +value : 0, code: code as string },
    { tenor: 2, value: value ? +value : 0, code: code as string },
    { tenor: 3, value: value ? +value : 0, code: code as string },
    { tenor: 4, value: value ? +value : 0, code: code as string },
    { tenor: 5, value: value ? +value : 0, code: code as string },
    { tenor: 6, value: value ? +value : 0, code: code as string },
    { tenor: 7, value: value ? +value : 0, code: code as string },
    { tenor: 8, value: value ? +value : 0, code: code as string },
    { tenor: 9, value: value ? +value : 0, code: code as string },
    { tenor: 10, value: value ? +value : 0, code: code as string },
    { tenor: 15, value: value ? +value : 0, code: code as string },
    { tenor: 20, value: value ? +value : 0, code: code as string },
    { tenor: 30, value: value ? +value : 0, code: code as string },
  ];

  let user: any;

  try {
    user = await prisma.reserve.createMany({
      data: initialDisc,
    });

    revalidatePath(`/anadette/anaopfin/${code}`);

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return { success: false, error };
  }
};

// Get LAst reserve

export const getLastReserve = async () => {
  try {
    const reserves = await prisma.reserve.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return {
      success: true,
      data: reserves,
    };
  } catch (error) {}
};

//Create Reserve from another
export const duplicateReserve = async (code: string, reserve: any) => {
  //console.log("reserve ", reserve);

  let reserves = [];
  for (let i = 0; i < reserve.length; i++) {
    reserves.push({
      tenor: +reserve[i].tenor,
      value: +reserve[i].value,
      code: code,
    });
  }

  //console.log("reserves ", reserves);

  let user: any;

  try {
    user = await prisma.reserve.createMany({
      data: reserves,
    });

    revalidatePath(`/anadette/anaopfin/${code}`);

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    return { success: false, error };
  }
};
