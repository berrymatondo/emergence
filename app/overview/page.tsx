import OverView from "@/components/overview/overV";
import { getAllOverview } from "@/lib/_overviewActions";
import React from "react";

const OverviewPage = async () => {
  const overs = await getAllOverview();
  //console.log("OVERVIEW", overs);

  return <OverView country="RD Congo" overs={overs} />;
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
