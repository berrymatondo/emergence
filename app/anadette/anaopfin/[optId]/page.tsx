import OptsList from "@/components/debtAna/optsList";
import { getFinOpts } from "@/lib/_finActions";
import { getAllCurrencies } from "@/lib/_otherActions";
import { getReserveByCode } from "@/lib/_reserveActions";

const OptAnaDetailPage = async ({ params }: any) => {
  const currencies = await getAllCurrencies();
  const opts = await getFinOpts(params?.optId);
  const reserve = await getReserveByCode(params?.optId);

  return (
    <div>
      {/*  <OptsList code={pathname.split("/")[3]} /> */}
      <OptsList
        code={params?.optId}
        currencies={currencies?.data}
        opts={opts?.data}
        reserve={reserve?.data.sort((a: any, b: any) => a.tenor - b.tenor)}
      />
    </div>
  );
};

export default OptAnaDetailPage;
