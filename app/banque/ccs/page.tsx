import CrossSwap from "@/components/nationalBank/cross/crossSwap";
import InterestRate from "@/components/nationalBank/interest/interestRate";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";

const CrossSwapPage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  return (
    <div className="">
      <CrossSwap countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default CrossSwapPage;
