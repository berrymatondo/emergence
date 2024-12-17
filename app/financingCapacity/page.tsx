import OverView from "@/components/overview/overV";
import { getAllBCCIntRates } from "@/lib/_bccIntRatesActions";
import { getAllFXR } from "@/lib/_fxratesActions";
import { getAllOverview } from "@/lib/_overviewActions";
import { getAllYC } from "@/lib/_ycAction";
import React from "react";

import type { Metadata } from "next";
import FinCapForm from "@/components/financingCapacity/finCapForm";

export const metadata: Metadata = {
  title: "DRC Financing Capacity",
  description: "Calcul de la capacité de financement",
};

const fxList = [
  { id: "1", label: "USD-CDF", taux: 2800 },
  { id: "2", label: "EUR-CDF", taux: 2850 },
];
const FinancingCapacityPage = async () => {
  /*   const overs = await getAllOverview();
  const yieldcurve = await getAllYC(true, 1, "2024-07-01");
  const fxrs = await getAllFXR();
  const bccrates = await getAllBCCIntRates(); */
  //console.log("OVERVIEW", bccrates);

  return <FinCapForm fxList={fxList} />;
};

export default FinancingCapacityPage;
