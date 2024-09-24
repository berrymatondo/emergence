"use client";
import { deleteImpMatrix } from "@/lib/_matrix";
import React from "react";
import { MdDelete } from "react-icons/md";

type DelImpMatrixProps = {
  id: string;
  refresh?: any;
  setRefresh?: (el: any) => void;
};
const DelImpMatrix = ({ id, refresh, setRefresh }: DelImpMatrixProps) => {
  return (
    <div>
      <MdDelete
        onClick={async () => {
          await deleteImpMatrix(id);
          // setRefresh(!refresh);
        }}
        size={20}
        className="text-red-600"
      />
    </div>
  );
};

export default DelImpMatrix;
