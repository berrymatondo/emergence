"use server";
import prisma from "./prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { cashflowSchema } from "./schemas";

type Inputs = z.infer<typeof cashflowSchema>;

export const getCashflowByCode = async (code: string) => {
  try {
    const cf = await prisma.cashflow.findMany({
      where: {
        code: code,
      },
    });

    return {
      success: true,
      data: cf,
    };
  } catch (error) {}
};
//getLastReserve

// Add reserve Input
export const createCashflow = async (cf: any, code: any, optId: number) => {
  let user: any;

  let cfTab = [];
  for (let i = 0; i < cf.length; i++) {
    cfTab.push({
      date: +cf[i].date,
      value: cf[i].gross,
      code: code,
      optId: +optId,
    });
  }

  //console.log("cfTab", cfTab);

  try {
    user = await prisma.cashflow.createMany({
      data: cfTab,
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

// Update Input
export const updateCashflow = async (
  cashflow: any,
  code: string,
  optId: number
) => {
  // console.log("cashflow", cashflow);

  //const result = cashflowSchema.safeParse(data);

  // Delete existing data for this code

  console.log("optid", optId);

  if (optId) {
    try {
      const overviews = await prisma.cashflow.deleteMany({
        where: {
          optId: optId,
        },
      });

      revalidatePath(`/anadette/anaopfin/${code}`);
      revalidatePath(`/anadette/anaopfin/${code}/new`);
      revalidatePath(`/anadette/anaopfin/${code}/update`);

      //console.log("cashflow2", cashflow);
      if (cashflow) createCashflow(cashflow, code, optId);

      return {
        success: true,
        data: overviews,
      };
    } catch (error) {}
  } else {
    if (cashflow) createCashflow(cashflow, code, optId);
  }

  /*   let user: any;
  if (result.success) {
    const { id, date, value, code } = result.data;

    try {
      user = await prisma.cashflow.update({
        where: {
          id: id ? +id : 0,
        },
        data: {
          date: date ? +date : 0,
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
  } */
};

// Delete reserve
// Delete
export const deleteCashflow = async (id: string, code: string) => {
  try {
    const overviews = await prisma.cashflow.delete({
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
