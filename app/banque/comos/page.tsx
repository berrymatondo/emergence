import CommoSwap from "@/components/nationalBank/commodity/commoSwap";
import InterestRate from "@/components/nationalBank/interest/interestRate";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";

const CommoSwapPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  return (
    <div className="">
      <CommoSwap countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default CommoSwapPage;
