import React from "react";
import { getFinOptById } from "@/lib/_finActions";
import { getAllCurrencies } from "@/lib/_otherActions";
import SouDetForm from "@/components/debtAna/souDetForm";

const SouDetPage = async ({
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
      <SouDetForm optIn={opt?.data} currencies={currencies?.data} />
    </div>
  );
};

export default SouDetPage;
