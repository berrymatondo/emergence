import OptChoice from "@/components/debtAna/optChoice";
import { getAllCountries, getAllCurrencies } from "@/lib/_otherActions";

const AnaOptFin = async ({ params }: any) => {
  // const countries = await getAllCountries();
  //const currencies = await getAllCurrencies();

  //console.log("PAram", params);

  return (
    <div className="">
      {/*       <InitOptAna currencies={currencies} />
       */}{" "}
      <OptChoice
      /*         optIn={{
          valType: searchParams.valType,
          maturityDate: searchParams.maturityDate,
          firstCouponDate: searchParams.firstCouponDate,
          valuationDate: searchParams.valuationDate,
          couponRate: searchParams.couponRate,
          couponFrequency: searchParams.couponFrequency,
          notional: searchParams.notional,
          couponCurrency: searchParams.couponCurrency,
          rating: searchParams.rating,
          recovering: searchParams.recovering,
        }}
        currencies={currencies} */
      />
    </div>
  );
};

export default AnaOptFin;
