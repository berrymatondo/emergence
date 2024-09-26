import AnalysisForm from "@/components/debtAna/analysisForm";
import React from "react";
import { getFinOptById } from "@/lib/_finActions";
import { getAllCurrencies } from "@/lib/_otherActions";

const AnalysisPage = async ({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) => {
  const currencies = await getAllCurrencies();
  const opt = await getFinOptById(searchParams.id);

  return (
    <div>
      <AnalysisForm optIn={opt?.data} currencies={currencies?.data} />
    </div>
  );
};

export default AnalysisPage;
