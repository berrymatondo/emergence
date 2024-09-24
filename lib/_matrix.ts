"use server";
import prisma from "./prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { defMatrixSchema, impMatrixSchema, transMatrixSchema } from "./schemas";

type Inputs = z.infer<typeof transMatrixSchema>;
type Inputs1 = z.infer<typeof defMatrixSchema>;
type Inputs2 = z.infer<typeof impMatrixSchema>;

export const getAllTransMatrix = async () => {
  try {
    const reserves = await prisma.transitionMatrix.findMany({});

    return {
      success: true,
      data: reserves,
    };
  } catch (error) {}
};

export const getAllImpMatrix = async () => {
  try {
    const reserves = await prisma.impliciteMatrix.findMany({});

    return {
      success: true,
      data: reserves,
    };
  } catch (error) {}
};

export const getAllDefMatrix = async () => {
  try {
    const reserves = await prisma.defaultMatrix.findMany({});

    return {
      success: true,
      data: reserves,
    };
  } catch (error) {}
};

// Get
export const getTransMatrix = async (id: string) => {
  try {
    const reserves = await prisma.transitionMatrix.findMany({
      where: {
        id: +id,
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
export const createTransMatrix = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = transMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { label, AAA, AA, A, BBB, BB, B, CCC_C, D, NR } = result.data;

    try {
      user = await prisma.transitionMatrix.create({
        data: {
          label: label as string,
          AAA: AAA ? +AAA : 0,
          AA: AA ? +AA : 0,
          A: A ? +A : 0,
          BBB: BBB ? +BBB : 0,
          BB: BB ? +BB : 0,
          B: B ? +B : 0,
          CCC_C: CCC_C ? +CCC_C : 0,
          D: D ? +D : 0,
          NR: NR ? +NR : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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

export const createImpMatrix = async (data: Inputs2) => {
  //console.log("reserve", data);

  const result = impMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { label, AAA, AA, A, BBB, BB, B, CCC_C, D, NR } = result.data;

    try {
      user = await prisma.impliciteMatrix.create({
        data: {
          label: label as string,
          AAA: AAA ? +AAA : 0,
          AA: AA ? +AA : 0,
          A: A ? +A : 0,
          BBB: BBB ? +BBB : 0,
          BB: BB ? +BB : 0,
          B: B ? +B : 0,
          CCC_C: CCC_C ? +CCC_C : 0,
          D: D ? +D : 0,
          NR: NR ? +NR : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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

export const createDefMatrix = async (data: Inputs1) => {
  //console.log("reserve", data);

  const result = defMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { label, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10 } = result.data;

    try {
      user = await prisma.defaultMatrix.create({
        data: {
          label: label as string,
          y1: y1 ? +y1 : 0,
          y2: y2 ? +y2 : 0,
          y3: y3 ? +y3 : 0,
          y4: y4 ? +y4 : 0,
          y5: y5 ? +y5 : 0,
          y6: y6 ? +y6 : 0,
          y7: y7 ? +y7 : 0,
          y8: y8 ? +y8 : 0,
          y9: y9 ? +y9 : 0,
          y10: y10 ? +y10 : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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
export const updateTransMatrix = async (data: Inputs) => {
  //console.log("reserve", data);

  const result = transMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { id, label, AAA, AA, A, BBB, BB, B, CCC_C, D, NR } = result.data;

    try {
      user = await prisma.transitionMatrix.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          label: label as string,
          AAA: AAA ? +AAA : 0,
          AA: AA ? +AA : 0,
          A: A ? +A : 0,
          BBB: BBB ? +BBB : 0,
          BB: BB ? +BB : 0,
          B: B ? +B : 0,
          CCC_C: CCC_C ? +CCC_C : 0,
          D: D ? +D : 0,
          NR: NR ? +NR : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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

export const updateImpMatrix = async (data: Inputs2) => {
  //console.log("reserve", data);

  const result = impMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { id, label, AAA, AA, A, BBB, BB, B, CCC_C, D, NR } = result.data;

    try {
      user = await prisma.impliciteMatrix.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          label: label as string,
          AAA: AAA ? +AAA : 0,
          AA: AA ? +AA : 0,
          A: A ? +A : 0,
          BBB: BBB ? +BBB : 0,
          BB: BB ? +BB : 0,
          B: B ? +B : 0,
          CCC_C: CCC_C ? +CCC_C : 0,
          D: D ? +D : 0,
          NR: NR ? +NR : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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

export const updateDefMatrix = async (data: Inputs1) => {
  //console.log("reserve", data);

  const result = defMatrixSchema.safeParse(data);

  let user: any;
  if (result.success) {
    const { id, label, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10 } = result.data;

    try {
      user = await prisma.defaultMatrix.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          label: label as string,
          y1: y1 ? +y1 : 0,
          y2: y2 ? +y2 : 0,
          y3: y3 ? +y3 : 0,
          y4: y4 ? +y4 : 0,
          y5: y5 ? +y5 : 0,
          y6: y6 ? +y6 : 0,
          y7: y7 ? +y7 : 0,
          y8: y8 ? +y8 : 0,
          y9: y9 ? +y9 : 0,
          y10: y10 ? +y10 : 0,
        },
      });

      revalidatePath(`/admin/matrix`);

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

// Delete transition matrix
export const deleteTransMatrix = async (id: string) => {
  try {
    const overviews = await prisma.transitionMatrix.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/admin/matrix`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

// Delete default matrix
export const deleteDefMatrix = async (id: string) => {
  try {
    const overviews = await prisma.defaultMatrix.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/admin/matrix`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};

// Delete implicite
export const deleteImpMatrix = async (id: string) => {
  try {
    const overviews = await prisma.impliciteMatrix.delete({
      where: {
        id: +id,
      },
    });

    revalidatePath(`/admin/matrix`);

    return {
      success: true,
      data: overviews,
    };
  } catch (error) {}
};
