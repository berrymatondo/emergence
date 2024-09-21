import OptAnaForm from "@/components/debtAna/optAnaForm";
import { getFinOptById } from "@/lib/_finActions";
import { getAllCurrencies } from "@/lib/_otherActions";
import React from "react";

const UpdateOptPage = async ({
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
      <OptAnaForm currencies={currencies?.data} optIn={opt?.data} type="U" />
    </div>
  );
};

export default UpdateOptPage;
