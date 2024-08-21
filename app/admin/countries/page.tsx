import { getAllCountries } from "@/lib/_otherActions";
import { Country } from "@prisma/client";
import React from "react";

const CountriesPage = async () => {
  const countries = await getAllCountries();

  return (
    <div>
      <p>List of countries</p>
      {countries?.data?.map((country: Country, index: any) => (
        <div key={country.id}>
          {index + 1} {country.name}
        </div>
      ))}
    </div>
  );
};

export default CountriesPage;
