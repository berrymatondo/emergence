import InterestRate from "@/components/nationalBank/interest/interestRate";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";

const InterestRatePage = async () => {
  const countries = await getAllCountries();
  const currencies = await getAllCurrencies();
  return (
    <div className="">
      <InterestRate countries={countries?.data} currencies={currencies?.data} />
    </div>
  );
};

export default InterestRatePage;
