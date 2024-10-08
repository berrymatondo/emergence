"use server";
import prisma from "./prisma";

// Get all yied curve per country
/* export const getAllYC = async (country: boolean, id: number) => {
  // console.log("country", country);
  // console.log("id", id);

  try {
    let ycs;
    if (country) {
      ycs = await prisma.yieldCurve.findMany({
        where: {
          AND: [{ type: "L" }, { countryId: id }],
        },
      });
    } else {
      ycs = await prisma.yieldCurve.findMany({
        where: {
          AND: [{ type: "L" }, { continentId: id }],
        },
      });
    }

    //revalidatePath("/admin/users");

    //console.log("ycs: ", ycs);

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
}; */

export const getAllYC = async (country: boolean, id: number, date: string) => {
  // console.log("country", country);
  // console.log("id", id);

  try {
    let ycs;
    if (country) {
      ycs = await prisma.yieldCurve.findMany({
        where: {
          AND: [{ date: date }, { countryId: id }],
        },
      });
    } else {
      ycs = await prisma.yieldCurve.findMany({
        where: {
          AND: [{ date: date }, { continentId: id }],
        },
      });
    }

    //revalidatePath("/admin/users");

    //console.log("ycs: ", ycs);

    return {
      success: true,
      data: ycs,
    };
  } catch (error) {}
};

// Get all zero coupu per currency
/* export const getAllZC = async (id: number) => {
  // console.log("country", country);
  // console.log("id", id);

  try {
    const zcr = await prisma.zCRates.findMany({
      where: {
        AND: [{ type: "L" }, { currencyId: id }],
      },
    });

    //revalidatePath("/admin/users");

    //console.log("ycs: ", ycs);

    return {
      success: true,
      data: zcr.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};
 */
// Get all zero coupu per currency
export const getAllZC = async (id: number, date: string) => {
  // console.log("country", country);
  // console.log("id", id);

  try {
    const zcr = await prisma.zCRates.findMany({
      where: {
        AND: [{ date: date }, { currencyId: id }],
      },
    });

    //revalidatePath("/admin/users");

    //console.log("ycs: ", ycs);

    return {
      success: true,
      data: zcr.sort((a: any, b: any) => a.tenor - b.tenor),
    };
  } catch (error) {}
};
