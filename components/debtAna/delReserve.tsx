"use client";
import { deleteReserve } from "@/lib/_reserveActions";
import React from "react";
import { MdDelete } from "react-icons/md";

type DelReserveProps = {
  id: string;
  code: string;
  refresh?: any;
  setRefresh?: (el: any) => void;
};
const DelReserve = ({ id, code, refresh, setRefresh }: DelReserveProps) => {
  return (
    <div>
      <MdDelete
        onClick={async () => {
          await deleteReserve(id, code);
          // setRefresh(!refresh);
        }}
        size={20}
        className="text-red-600"
      />
    </div>
  );
};

export default DelReserve;
