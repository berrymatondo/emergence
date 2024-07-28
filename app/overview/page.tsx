import OverView from "@/components/overview/overV";
import { getAllBCCIntRates } from "@/lib/_bccIntRatesActions";
import { getAllFXR } from "@/lib/_fxratesActions";
import { getAllOverview } from "@/lib/_overviewActions";
import { getAllYC } from "@/lib/_ycAction";
import React from "react";

const OverviewPage = async () => {
  const overs = await getAllOverview();
  const yieldcurve = await getAllYC();
  const fxrs = await getAllFXR();
  const bccrates = await getAllBCCIntRates();
  //console.log("OVERVIEW", bccrates);

  return (
    <OverView
      country="RD Congo"
      overs={overs}
      yieldcurve={yieldcurve}
      fxrs={fxrs}
      bccrates={bccrates}
    />
  );
};

export default OverviewPage;
/* import Link from "next/link";
import React from "react";

const OverviewPage = async () => {
  const res = await fetch("http://213.165.83.130/valuation");
  const posts = await res.json();

  console.log("TEST", posts);

  return (
    <div>
      {posts?.message}

      <div>
        <Link
          className="p-2 bg-slate-500 rounded-lg text-white"
          target="_blank"
          href="http://213.165.83.130"
        >
          Endpoints
        </Link>
      </div>
    </div>
  );
};

export default OverviewPage;
 */
