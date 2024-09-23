"use client";
import { deleteTransMatrix } from "@/lib/_matrix";
import React from "react";
import { MdDelete } from "react-icons/md";

type DelTransMatrixProps = {
  id: string;
  refresh?: any;
  setRefresh?: (el: any) => void;
};
const DelTransMatrix = ({ id, refresh, setRefresh }: DelTransMatrixProps) => {
  return (
    <div>
      <MdDelete
        onClick={async () => {
          await deleteTransMatrix(id);
          // setRefresh(!refresh);
        }}
        size={20}
        className="text-red-600"
      />
    </div>
  );
};

export default DelTransMatrix;
