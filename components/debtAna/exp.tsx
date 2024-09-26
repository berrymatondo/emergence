"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

type TotoPros = {
  opts: any;
  code: string;
};

export default function Exp({ opts, code }: TotoPros) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //console.log("opts", opts);

  /*   useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("DATA", data);

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []); */ // Empty dependency array ensures the effect runs only once after the initial render

  const onGetExporProduct = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      // Check if the action result contains data and if it's an array
      /*       if (products && Array.isArray(products)) {
        const dataToExport = products.map((pro: any) => ({
          title: pro.title,
          price: pro.lastname,
          category: pro.category,
          description: pro.description,
        })); */
      if (opts && Array.isArray(opts)) {
        const dataToExport = opts.map((pro: any) => ({
          id: "Option" + pro.id,
          code: pro.code,
          valuationType: pro.valuationType,
          cma: pro.cma,
          duration: pro.duration.toFixed(2),
          defProba: pro.defProba,
          refinRisk: pro.refinRisk,
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };
  return (
    <div className=" text-center p-4">
      <button
        onClick={() => onGetExporProduct(code, "FincancingOptionExport")}
        className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600"
      >
        <span className="relative">{loading ? "Loading..." : "Export"}</span>
        <div className="animate-shine-infinite absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center blur-[12px]">
          <div className="relative h-full w-8 bg-white/30"></div>
        </div>
      </button>
    </div>
  );
}
